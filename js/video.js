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
      card.querySelector("a").href = `https://youtu.be/${video.videoId}?feature=shared`;
      card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
      card.querySelector("[data-title]").textContent = video.title;
      card.querySelector("[data-uploader]").textContent = video.uploader;
      card.querySelector("[data-meta]").textContent = `조회수 ${video.views} • ${video.uploadDate}`;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("JSON 로딩 실패:", err));

const textContainer = document.getElementById('owner-text');
const showMoreBtn = document.getElementById('showMore');
const showHiddenBtn = document.getElementById('showhidden');

function showMore() {
  textContainer.style.webkitLineClamp = 'unset';
  textContainer.style.overflow = 'visible';
  textContainer.style.display = 'block'; // box -> block으로 풀기
  showMoreBtn.style.display = 'none';
  showHiddenBtn.style.display = 'inline';
}

function showhidden() {
  textContainer.style.display = '-webkit-box';
  textContainer.style.webkitLineClamp = '3';
  textContainer.style.overflow = 'hidden';
  showMoreBtn.style.display = 'inline';
  showHiddenBtn.style.display = 'none';
}
