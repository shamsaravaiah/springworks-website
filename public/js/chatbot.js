(function () {
  const SESSION_KEY = "msw_chat_session_id";

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Mody Spring Works chatbot");
  panel.innerHTML = `
    <div class="chat-header">
      <div>
        <h3>MSW Assistant</h3>
        <small>Temporary memory · this session only</small>
      </div>
      <div class="chat-header-actions">
        <button type="button" class="chat-reset" title="Clear chat memory" aria-label="Clear chat">↻</button>
        <button type="button" class="chat-close" title="Close" aria-label="Close">✕</button>
      </div>
    </div>
    <div class="chat-messages" id="chatMessages"></div>
    <form class="chat-input-row" id="chatForm">
      <input type="text" id="chatInput" placeholder="Ask about springs, quotes..." autocomplete="off" required />
      <button type="submit" id="chatSend">Send</button>
    </form>
  `;

  const launcher = document.createElement("button");
  launcher.className = "chat-launcher";
  launcher.type = "button";
  launcher.title = "Chat with us";
  launcher.setAttribute("aria-label", "Open chatbot");
  launcher.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      <circle cx="8" cy="10" r="1.2"/>
      <circle cx="12" cy="10" r="1.2"/>
      <circle cx="16" cy="10" r="1.2"/>
    </svg>`;

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  const messagesEl = panel.querySelector("#chatMessages");
  const form = panel.querySelector("#chatForm");
  const input = panel.querySelector("#chatInput");
  const sendBtn = panel.querySelector("#chatSend");
  const closeBtn = panel.querySelector(".chat-close");
  const resetBtn = panel.querySelector(".chat-reset");

  let sessionId = sessionStorage.getItem(SESSION_KEY) || null;
  let busy = false;

  function addBubble(text, type) {
    const el = document.createElement("div");
    el.className = `chat-bubble ${type}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function welcome() {
    if (messagesEl.children.length) return;
    addBubble(
      "Hi! I'm the Mody Spring Works assistant. Ask me about products, industries we serve, or how to request a quote. I remember this conversation until you clear it or close the browser tab.",
      "bot"
    );
  }

  function openChat() {
    panel.classList.add("open");
    welcome();
    input.focus();
  }

  function closeChat() {
    panel.classList.remove("open");
  }

  launcher.addEventListener("click", () => {
    if (panel.classList.contains("open")) closeChat();
    else openChat();
  });
  closeBtn.addEventListener("click", closeChat);

  resetBtn.addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true, sessionId }),
      });
      const data = await res.json();
      sessionId = data.sessionId || null;
      if (sessionId) sessionStorage.setItem(SESSION_KEY, sessionId);
      else sessionStorage.removeItem(SESSION_KEY);
      messagesEl.innerHTML = "";
      addBubble(data.reply || "Chat cleared.", "system");
      addBubble("How can I help you with springs today?", "bot");
    } catch {
      addBubble("Could not clear chat. Please try again.", "system");
    } finally {
      busy = false;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message || busy) return;

    addBubble(message, "user");
    input.value = "";
    busy = true;
    sendBtn.disabled = true;
    const typing = document.createElement("div");
    typing.className = "chat-typing";
    typing.textContent = "Assistant is typing…";
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      });
      const data = await res.json();
      typing.remove();

      if (data.sessionId) {
        sessionId = data.sessionId;
        sessionStorage.setItem(SESSION_KEY, sessionId);
      }

      if (!res.ok) {
        addBubble(data.error || "Something went wrong.", "system");
      } else {
        addBubble(data.reply, "bot");
      }
    } catch {
      typing.remove();
      addBubble("Network error. Please check that the server is running.", "system");
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });
})();
