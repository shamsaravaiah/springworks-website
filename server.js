require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const AZURE_ENDPOINT =
  process.env.AZURE_ENDPOINT ||
  "https://senseijay10-3619-resource.services.ai.azure.com/openai/v1/chat/completions";
const AZURE_API_KEY = process.env.AZURE_API_KEY || process.env.OPENAI_API_KEY || "";
const AZURE_MODEL = process.env.AZURE_MODEL || "gpt-4o";
const SESSION_TTL_MS = Number(process.env.CHAT_SESSION_TTL_MS || 30 * 60 * 1000);
const MAX_HISTORY = Number(process.env.CHAT_MAX_HISTORY || 20);

/** @type {Map<string, { messages: Array<{role:string,content:string}>, updatedAt: number }>} */
const sessions = new Map();

const SYSTEM_PROMPT = `You are the website assistant for Mody Spring Works (Hyderabad), an ISO 9001 industrial springs manufacturer.

Company:
- Address: 11-186, Fateh Nagar Main Road, Hyderabad, Telangana 500018
- Phone: +91-9849403560 (Chandresh Mody), +91-9959535268 (Haresh Mody)
- Email: info@modyspringworks.com
- Hours: Mon–Sat 9AM–6:30PM, Sunday Closed

Products: Compression Springs, Tension Springs, Conical Springs, Torsion Springs, Wireforms, Touch Sensor Springs, Barrel Springs, R-Pins, Air Compressor Valve Plates, Switch Springs.

Industries: Defence, Electronic & Electrical Devices, Irrigation, Oil & Gas, Medical Devices, Home Appliances, Pharma, Modular Touch Switches, Air Compressors.

Style rules:
- Answer the user's question directly first. Keep replies short (2–5 sentences unless they ask for detail).
- Do NOT open with a long intake questionnaire.
- Only ask for missing details when they are required to help (for a custom quote/order). Ask at most 1–2 specific questions at a time.
- For product or company questions, give facts first; offer contact only at the end if useful.
- For quote requests, briefly say you can help, then ask only the most important missing info (spring type and quantity, or dimensions if type is known). Mention email/phone once, not every turn.
- Be professional and plain. No filler sales language. You have temporary memory for this chat session only.`

function pruneSessions() {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.updatedAt > SESSION_TTL_MS) sessions.delete(id);
  }
}

setInterval(pruneSessions, 60 * 1000).unref();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    hasApiKey: Boolean(AZURE_API_KEY),
    model: AZURE_MODEL,
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!AZURE_API_KEY) {
      return res.status(500).json({
        error:
          "API key not configured. Add AZURE_API_KEY to your .env file and restart the server.",
      });
    }

    const { message, sessionId: incomingSessionId, reset } = req.body || {};
    let sessionId = incomingSessionId || crypto.randomUUID();

    if (reset) {
      sessions.delete(sessionId);
      sessionId = crypto.randomUUID();
      return res.json({
        sessionId,
        reply: "Chat cleared. How can I help you with springs today?",
        messages: [],
      });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    pruneSessions();
    let session = sessions.get(sessionId);
    if (!session) {
      session = { messages: [], updatedAt: Date.now() };
      sessions.set(sessionId, session);
    }

    session.messages.push({ role: "user", content: message.trim() });
    if (session.messages.length > MAX_HISTORY) {
      session.messages = session.messages.slice(-MAX_HISTORY);
    }
    session.updatedAt = Date.now();

    const payload = {
      model: AZURE_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...session.messages],
      temperature: 0.5,
      max_tokens: 800,
    };

    const response = await fetch(AZURE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AZURE_API_KEY}`,
        "api-key": AZURE_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Azure API error:", response.status, data);
      session.messages.pop();
      return res.status(response.status).json({
        error:
          data.error?.message ||
          data.message ||
          `Azure API request failed (${response.status})`,
        sessionId,
      });
    }

    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a response. Please try again.";

    session.messages.push({ role: "assistant", content: reply });
    session.updatedAt = Date.now();

    res.json({
      sessionId,
      reply,
      messages: session.messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while contacting the AI service." });
  }
});

app.listen(PORT, () => {
  console.log(`Mody Spring Works clone running at http://localhost:${PORT}`);
  console.log(`API key configured: ${Boolean(AZURE_API_KEY)}`);
});
