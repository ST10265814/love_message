
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

  function downloadCard() {
    html2canvas(document.querySelector("#card")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "soulmate-card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }

      // Make sure CCapture is available globally or imported before this function
      function downloadVideo() {
        if (typeof CCapture === "undefined") {
          alert("CCapture library is not loaded.");
          return;
        }
        const card = document.getElementById("card");
        const capturer = new CCapture({ format: "webm", framerate: 30 });

        let frames = 60; // 2 seconds of animation
        let count = 0;
        capturer.start();

        const renderFrame = function () {
          html2canvas(card).then((canvas) => {
            capturer.capture(canvas);
            count++;
            if (count < frames) {
              requestAnimationFrame(renderFrame);
            } else {
              capturer.stop();
              capturer.save();
            }
          });
        };

        renderFrame();
      }

      function generateLink() {
        const to = encodeURIComponent(document.getElementById("toInput").value);
        const from = encodeURIComponent(
          document.getElementById("fromInput").value
        );
        const msg = encodeURIComponent(
          document.getElementById("messageInput").value
        );

        const url = `${window.location.origin}${window.location.pathname}?to=${to}&from=${from}&msg=${msg}`;
        const output = document.getElementById("linkOutput");
        output.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
        output.style.display = "block";
      }

      window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const to = urlParams.get("to");
        const from = urlParams.get("from");
        const msg = urlParams.get("msg");

        if (to || from || msg) {
          document.getElementById("toInput").value = decodeURIComponent(
            to || ""
          );
          document.getElementById("fromInput").value = decodeURIComponent(
            from || ""
          );
          document.getElementById("messageInput").value = decodeURIComponent(
            msg || ""
          );
          updateCard();
        }

        // Add event listeners for buttons if JS is loaded before DOM
        document.querySelector('.form').addEventListener('submit', function(e) {
          e.preventDefault();
          updateCard();
        });
        document.querySelector('.actions button[onclick="downloadCard()"]').addEventListener('click', downloadCard);
        document.querySelector('.actions button[onclick="downloadVideo()"]').addEventListener('click', downloadVideo);
        document.querySelector('.actions button[onclick="generateLink()"]').addEventListener('click', generateLink);
      };
    