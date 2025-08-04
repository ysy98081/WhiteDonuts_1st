document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id");
  const videouploader = params.get("uploader");
  const searchQuery = params.get("search");

  const iframe = document.getElementById("youtube-frame");
  const videoTitle = document.getElementById("youtube-title");
  const videoIcon = document.getElementById("youtube-icon");
  const videoViews = document.getElementById("owner-views");
  const videoUploadDate = document.getElementById("owner-uploadDate");
  const videoUploader = document.getElementById("youtube-uploader");
  const videoSubs = document.getElementById("youtube-subs");
  const videofullText = document.getElementById("owner-text");

  const container = document.getElementById("subscribe-video-list");
  const template = document.getElementById("subscribe-card-template");

  let allData = [];

  // ✅ 검색어가 있으면 index.html에서 필터링
  function handleSearchParam(data) {
    if (!searchQuery) return data;

    const keyword = searchQuery.trim().toLowerCase();
    return data.filter(video =>
      video.title.toLowerCase().includes(keyword) ||
      video.uploader.toLowerCase().includes(keyword) ||
      (video.subject && video.subject.toLowerCase().includes(keyword))
    );
  }

  // 카드 렌더링 함수
  function renderCards(filteredData) {
    container.innerHTML = "";

    const groupedBySubject = {};
    filteredData.forEach(video => {
      if (!groupedBySubject[video.subject]) {
        groupedBySubject[video.subject] = [];
      }
      groupedBySubject[video.subject].push(video);
    });

    Object.entries(groupedBySubject).forEach(([subject, videos]) => {
      const sectionTitle = document.createElement("h4");
      sectionTitle.className = "my-4 fw-bold";
      sectionTitle.textContent = subject;
      container.appendChild(sectionTitle);

      const row = document.createElement("div");
      row.className = "scrolling-card-row d-flex flex-nowrap gap-3";

      videos.forEach(video => {
        const card = template.cloneNode(true);
        card.removeAttribute("id");
        card.style.display = "";

        card.querySelector("a").href = `video.html?id=${video.videoId}`;
        card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
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

        row.appendChild(card);
      });

      container.appendChild(row);
    });
  }

  // 검색 처리 함수
  function handleLocalSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
      renderCards(allData);
      return;
    }

    const filtered = allData.filter(video =>
      video.title.toLowerCase().includes(keyword) ||
      video.uploader.toLowerCase().includes(keyword) ||
      (video.subject && video.subject.toLowerCase().includes(keyword))
    );

    renderCards(filtered);
  }

  // 🔁 검색 버튼 클릭 시 index.html로 이동 (subscribe.html 포함 공통)
  // if (searchButton && searchInput) {
  //   searchButton.addEventListener("click", () => {
  //     const keyword = searchInput.value.trim();
  //     if (keyword) {
  //       window.location.href = `../html/index.html?search=${encodeURIComponent(keyword)}`;
  //     }
  //   });
  //
  //   searchInput.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") {
  //       searchButton.click();
  //     }
  //   });
  // }

  // 데이터 로딩
  fetch("../data/package.json")
    .then(res => res.json())
    .then(data => {
      allData = data;

      if (videoId) {
        const video = data.find(v => v.videoId === videoId);
        if (video && iframe) {
          iframe.src = video.iframeurl;
          videoTitle.textContent = video.title;
          videoIcon.src = video.icon;
          videoViews.textContent = "조회수 " + video.views;
          videoUploadDate.textContent = video.uploadDate;
          videoUploader.textContent = video.uploader;
          videoSubs.textContent = video.subscriberCount || "";
          videofullText.textContent = video.fullText;
        }
      }

      let filteredData = data;

      if (videouploader) {
        filteredData = data.filter(video => video.uploader === videouploader);
      }

      if (searchQuery) {
        filteredData = handleSearchParam(data);
      }

      renderCards(filteredData);
    })
    .catch(err => console.error("JSON 로딩 실패:", err));
});
