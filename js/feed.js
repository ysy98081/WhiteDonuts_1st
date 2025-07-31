fetch("../data/package.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("video-list");
    const template = document.getElementById("card-template");

    data.forEach(video => {
      const card = template.cloneNode(true);
      card.removeAttribute("id");
      card.style.display = "";

      // 정보 채우기
      card.querySelector("a").href = "video.html?id=" + video.videoId;
      card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
      card.querySelector("[data-icon]").src = video.icon;
      card.querySelector("[data-title]").textContent = video.title;
      card.querySelector("[data-uploader]").textContent = video.uploader;
      card.querySelector("[data-meta]").textContent = `조회수 ${video.views} • ${video.uploadDate}`;

      // iframe hover 로직
      const wrapper = card.querySelector("[data-iframe]");
      const videoCard = card.querySelector(".video-card");

      videoCard.addEventListener("mouseenter", () => {
        const iframe = document.createElement("iframe");
        iframe.src = video.iframeurl + "&autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&showinfo=0";
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        wrapper.innerHTML = ""; // 중복 방지
        wrapper.appendChild(iframe);
      });

      videoCard.addEventListener("mouseleave", () => {
        wrapper.innerHTML = "";
      });

      container.appendChild(card);
    });
  })
  .catch(err => console.error("JSON 로딩 실패:", err));
