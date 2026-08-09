// ===== Cloud5 — interactions =====
(function () {
  "use strict";

  // ---- Set your bakery WhatsApp number here (international format, digits only) ----
  var WHATSAPP_NUMBER = "971508556603";

  // Sticky nav shadow
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // WhatsApp links — every element with a data-wa attribute gets a wa.me href
  var waBase = "Hi Cloud5! I'd love to place an order 🧁";
  function waLink(text) {
    var msg = encodeURIComponent(text || waBase);
    return WHATSAPP_NUMBER
      ? "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg
      : "https://wa.me/?text=" + msg;
  }
  document.querySelectorAll("[data-wa]").forEach(function (el) { el.href = waLink(); });

  // Order form -> opens WhatsApp with the details prefilled
  var form = document.getElementById("orderForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var details = document.getElementById("details").value.trim();

      if (!name || !phone || !details) {
        note.style.color = "#c0392b";
        note.textContent = "Please fill in your name, number and what you'd like to order.";
        return;
      }

      var text =
        "Hi Cloud5! 🧁\nName: " + name +
        "\nWhatsApp: " + phone +
        "\nOrder: " + details;

      window.open(waLink(text), "_blank", "noopener");
      note.style.color = "";
      note.textContent = "🎉 Thank you, " + name + "! Opening WhatsApp to send your order to Cloud5…";
      form.reset();
    });
  }

  // Scroll reveal
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    },
    { threshold: 0.15 }
  );
  document
    .querySelectorAll(".item, .vcard, .section-head, .story__text, .story__media, .menu__cat")
    .forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
})();
