// 검색어 파라미터 읽기
const params = new URLSearchParams(window.location.search);
const searchKeyword = params.get("search")?.toLowerCase() || "";

fetch("data/package.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("main-video-list");
    const template = document.getElementById("main-card-template");

    // 검색 필터링
    const filteredData = searchKeyword
      ? data.filter(video =>
        video.title.toLowerCase().includes(searchKeyword) ||
        video.uploader.toLowerCase().includes(searchKeyword) ||
        (video.subject && video.subject.toLowerCase().includes(searchKeyword))
      )
      : data;

    // 기존 내용 제거
    container.innerHTML = "";

    // 카드 렌더링
    filteredData.forEach(video => {
      const card = template.cloneNode(true);
      card.removeAttribute("id");
      card.style.display = "";

      card.querySelector("a").href = "html/video.html?id=" + video.videoId;
      card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
      card.querySelector("[data-icon]").src = "../" + video.icon;
      card.querySelector("[data-title]").textContent = video.title;
      card.querySelector("[data-uploader]").textContent = video.uploader;
      card.querySelector("[data-meta]").textContent = `조회수 ${video.views} • ${video.uploadDate}`;

      const wrapper = card.querySelector("[data-iframe]");
      const videoCard = card.querySelector(".video-card");

      videoCard.addEventListener("mouseenter", () => {
        const iframe = document.createElement("iframe");
        iframe.src = video.iframeurl + "&autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&showinfo=0";
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        wrapper.innerHTML = "";
        wrapper.appendChild(iframe);
      });

      videoCard.addEventListener("mouseleave", () => {
        wrapper.innerHTML = "";
      });

      container.appendChild(card);
    });
  })
  .catch(err => console.error("JSON 로딩 실패:", err));
