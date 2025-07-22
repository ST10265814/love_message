// script.js

// Update card content based on form input
function updateCard() {
  const to = document.getElementById("toInput").value || "...";
  const from = document.getElementById("fromInput").value || "...";
  const msg =
    document.getElementById("messageInput").value ||
    "Your love message appears here...";

  document.getElementById("toText").innerHTML = `<strong>To:</strong> ${to}`;
  document.getElementById("fromText").innerHTML = `<strong>From:</strong> ${from}`;
  document.getElementById("msgText").textContent = msg;
}

// Download card as image
function downloadCard() {
  const card = document.getElementById("card");
  html2canvas(card).then((canvas) => {
    const link = document.createElement("a");
    link.download = "soulmate-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Generate shareable link
function generateLink() {
  const to = encodeURIComponent(document.getElementById("toInput").value);
  const from = encodeURIComponent(document.getElementById("fromInput").value);
  const msg = encodeURIComponent(document.getElementById("messageInput").value);

  const url = `${window.location.origin}${window.location.pathname}?to=${to}&from=${from}&msg=${msg}`;
  const output = document.getElementById("linkOutput");
  output.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  output.style.display = "block";
}

// Load values from URL on page load
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const to = urlParams.get("to");
  const from = urlParams.get("from");
  const msg = urlParams.get("msg");

  if (to || from || msg) {
    document.getElementById("toInput").value = decodeURIComponent(to || "");
    document.getElementById("fromInput").value = decodeURIComponent(from || "");
    document.getElementById("messageInput").value = decodeURIComponent(msg || "");
    updateCard();
  }

  // Set up event listeners
  document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();
    updateCard();
  });

  document.getElementById("btnImage").addEventListener("click", downloadCard);
  document.getElementById("btnLink").addEventListener("click", generateLink);
};
// Initialize card on page load
updateCard();
document.addEventListener("DOMContentLoaded", updateCard);
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("toInput").focus();
});