fetch("../data/package.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("video-list");
    const template = document.getElementById("card-template");

    data.forEach(video => {
      const card = template.cloneNode(true);
      card.removeAttribute("id");
      card.style.display = ""; // 보이게 설정

      // 요소 채우기
      card.querySelector("a").href = `html/video.html?id=${video.videoId}`;
      card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
      card.querySelector("[data-icon]").src = video.icon;
      card.querySelector("[data-title]").textContent = video.title;
      card.querySelector("[data-uploader]").textContent = video.uploader;
      card.querySelector("[data-meta]").textContent = `조회수 ${video.views} • ${video.uploadDate}`;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("JSON 로딩 실패:", err));

