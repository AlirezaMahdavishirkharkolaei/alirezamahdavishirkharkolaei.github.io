// Site behaviour: mobile menu, active section, reveal-on-scroll, citation copy and the contact form.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // Optional: create a free form at https://formspree.io and paste its id (e.g. "xyzabcd") to receive
  // messages by e-mail without opening the visitor's mail app. Left empty, the form opens a pre-filled e-mail.
  var FORMSPREE_ID = "";
  var EMAIL = "lawyer.alirezamahdavi@gmail.com";

  var btn = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); reveal.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  document.querySelectorAll(".cite-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-cite");
      var done = function () { b.textContent = "Citation copied ✓"; setTimeout(function () { b.textContent = "Copy citation"; }, 2200); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { window.prompt("Copy the citation:", text); });
      else window.prompt("Copy the citation:", text);
    });
  });

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "form-status";
    if (!form.checkValidity()) {
      status.textContent = "Please fill in every field with a valid e-mail address.";
      status.className = "form-status err";
      form.reportValidity();
      return;
    }
    var d = new FormData(form);
    if (FORMSPREE_ID) {
      var submit = form.querySelector("button");
      submit.disabled = true;
      status.textContent = "Sending…";
      fetch("https://formspree.io/f/" + FORMSPREE_ID, { method: "POST", body: d, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = "Thank you, your message has been sent.";
        })
        .catch(function () {
          status.textContent = "The message could not be sent. Please e-mail " + EMAIL + " directly.";
          status.className = "form-status err";
        })
        .then(function () { submit.disabled = false; });
      return;
    }
    var body = d.get("message") + "\n\n" + d.get("name") + "\n" + d.get("email");
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
    status.textContent = "Your e-mail app should open with the message ready to send. If it does not, write to " + EMAIL + ".";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
