(function () {
  const products = [
    ["Compression Springs", "/products/compression-springs.html"],
    ["Tension Springs", "/products/tension-springs.html"],
    ["Conical Springs", "/products/conical-springs.html"],
    ["Torsion Springs", "/products/torsion-springs.html"],
    ["Wireforms", "/products/wireforms.html"],
    ["Touch Sensor Springs", "/products/touch-sensor-springs.html"],
    ["Barrel Springs", "/products/barrel-springs.html"],
    ["R-Pins", "/products/r-pins.html"],
    ["Air Compressor Valve Plates", "/products/air-compressor-valve-plates.html"],
    ["Switch Springs", "/products/switch-springs.html"],
  ];

  const industries = [
    ["Defence", "/industries/defence.html"],
    ["Electronic & Electrical Devices", "/industries/electronic-electrical.html"],
    ["Irrigation", "/industries/irrigation.html"],
    ["Oil & Gas Industry", "/industries/oil-gas.html"],
    ["Medical Devices", "/industries/medical-devices.html"],
    ["Home Appliances", "/industries/home-appliances.html"],
    ["Pharma Industry", "/industries/pharma.html"],
    ["Modular Touch Switches", "/industries/modular-touch-switches.html"],
    ["Air Compressors", "/industries/air-compressors.html"],
  ];

  function submenu(items) {
    return items
      .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
      .join("");
  }

  const headerHTML = `
  <div class="top-bar">
    <div class="container top-bar-inner">
      <a href="tel:+919849403560">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
        +91 - 9849403560
      </a>
      <a href="tel:+919959535268">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
        +91 - 9959535268
      </a>
      <a href="https://wa.me/919849403560" target="_blank" rel="noopener">
        <svg class="icon" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.7.7 1.8.8 1.9.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.7-.8c.1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.3 0 .9-.2 1.6z"/></svg>
        Whatsapp
      </a>
      <a href="/contact.html">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
        Send Inquiry
      </a>
      <a href="mailto:info@modyspringworks.com">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>
        info@modyspringworks.com
      </a>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="/index.html" aria-label="Mody Spring Works">
        <img src="/images/logo.png" alt="Mody Spring Works" />
      </a>
      <button class="nav-toggle" aria-label="Menu" type="button">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" id="mainNav">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about.html">About us</a></li>
          <li class="nav-dropdown">
            <a href="/products/index.html">Products ▾</a>
            <ul class="submenu">${submenu(products)}</ul>
          </li>
          <li class="nav-dropdown">
            <a href="/industries/index.html">Industries We Serve ▾</a>
            <ul class="submenu">${submenu(industries)}</ul>
          </li>
          <li><a href="/gallery.html">Gallery</a></li>
          <li><a href="/blog.html">Blog</a></li>
          <li><a href="/contact.html">Contact us</a></li>
        </ul>
      </nav>
    </div>
  </header>`;

  const footerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about.html">About us</a></li>
          <li><a href="/gallery.html">Gallery</a></li>
          <li><a href="/contact.html">Contact us</a></li>
        </ul>
      </div>
      <div>
        <h4>Our Products</h4>
        <ul>
          ${products
            .slice(0, 6)
            .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
            .join("")}
        </ul>
      </div>
      <div>
        <h4>Industries We Serve</h4>
        <ul>
          ${industries
            .slice(0, 6)
            .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
            .join("")}
        </ul>
      </div>
      <div>
        <h4>Reach Us</h4>
        <p>11-186, Fateh Nagar Main Road, Hyderabad, Telangana 500018</p>
        <p>
          <a href="mailto:info@modyspringworks.com">info@modyspringworks.com</a><br />
          <a href="mailto:cb_mody@yahoo.com">cb_mody@yahoo.com</a><br />
          <a href="mailto:hareshmody76@gmail.com">hareshmody76@gmail.com</a>
        </p>
        <p>
          <a href="tel:+919849403560">+91 - 9849403560</a> (Chandresh Mody)<br />
          <a href="tel:+919959535268">+91 - 9959535268</a> (Haresh Mody)
        </p>
        <p>Opening Timings:<br />Mon - Sat : 9AM - 6.30PM<br />Sunday - Closed</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>Copyright © ${new Date().getFullYear()} Mody Spring Works. All Rights Reserved</span>
      <span>Clone demo with AI chatbot</span>
    </div>
  </footer>

  <a class="float-call" href="tel:+919849403560" aria-label="Call now" title="Call now">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>
  </a>
  <a class="float-whatsapp" href="https://wa.me/919849403560" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.7.7 1.8.8 1.9.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.7-.8c.1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.3 0 .9-.2 1.6z"/></svg>
  </a>`;

  const mountHeader = document.getElementById("site-header-mount");
  const mountFooter = document.getElementById("site-footer-mount");
  if (mountHeader) mountHeader.outerHTML = headerHTML;
  if (mountFooter) mountFooter.outerHTML = footerHTML;

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  document.querySelectorAll(".nav-dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  const path = location.pathname.replace(/\/$/, "") || "/index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === path || (path.endsWith(href.replace(/^\//, "")))) {
      a.classList.add("active");
    }
  });
})();
