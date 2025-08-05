// URL에서 search 파라미터 읽기
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search")?.toLowerCase() || "";

fetch("../data/package.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("video-list");
    const template = document.getElementById("card-template");

    // 검색어가 있다면 필터링
    const filteredData = searchQuery
      ? data.filter(video =>
        video.title.toLowerCase().includes(searchQuery) ||
        video.uploader.toLowerCase().includes(searchQuery) ||
        (video.subject && video.subject.toLowerCase().includes(searchQuery))
      )
      : data;

    // 기존 카드 제거
    container.innerHTML = "";

    filteredData.forEach(video => {
      const card = template.cloneNode(true);
      card.removeAttribute("id");
      card.style.display = "";

      // 카드 정보 채우기
      card.querySelector("a").href = "video.html?id=" + video.videoId;
      card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
      card.querySelector("[data-icon]").src = "../" + video.icon;
      card.querySelector("[data-title]").textContent = video.title;
      card.querySelector("[data-uploader]").textContent = video.uploader;
      card.querySelector("[data-meta]").textContent = `조회수 ${video.views} • ${video.uploadDate}`;

      // hover 시 iframe 삽입
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
