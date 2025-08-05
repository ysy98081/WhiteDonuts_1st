document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id");

  fetch("../data/comment.json")
    .then(res => res.json())
    .then(data => {
      if (videoId) {
        console.log("현재 videoId:", videoId);
        const list = document.getElementById("comment-container");
        const template = document.getElementById("comment-template");

        // 해당 videoId에 맞는 댓글만 필터링
        const videoComments = data.filter(comment => comment.videoId === videoId);

        videoComments.forEach(comment => {
          const commentlist = template.cloneNode(true);
          commentlist.removeAttribute("id");
          commentlist.style.display = "";
          commentlist.classList.add("d-flex", "align-items-start");

          commentlist.querySelector("[data-user]").textContent = comment.user;
          commentlist.querySelector("[data-avatar]").setAttribute("src", comment.avatar);
          commentlist.querySelector("[data-comment]").textContent = comment.comment;
          commentlist.querySelector("[data-likes]").textContent = comment.likes;
          commentlist.querySelector("[data-dislikes]").textContent = comment.dislikes;
          commentlist.querySelector("[data-time]").textContent = comment.time;

          list.appendChild(commentlist);
        });
      }
    })
    .catch(err => console.error("JSON 로딩 실패:", err));
});

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

const thumupBtn = document.getElementById('thumbupbtn');
const thumupNum = document.getElementById('thumbup-num');
const thumdownBtn = document.getElementById('thumbdownbtn');
const thumdownNum = document.getElementById('thumbdown-num');

let baseUp = parseInt(thumupNum.textContent);
let baseDown = parseInt(thumdownNum.textContent);

let isThumbUp = false;
let isThumbDown = false;

thumupBtn.addEventListener('click', () => {
  if (isThumbUp) {
    baseUp--;
    isThumbUp = false;
  } else {
    baseUp++;
    if (isThumbDown) {
      baseDown--;
      isThumbDown = false;
    }
    isThumbUp = true;
  }

  thumupNum.textContent = baseUp;
  thumdownNum.textContent = baseDown;
});

thumdownBtn.addEventListener('click', () => {
  if (isThumbDown) {
    baseDown--;
    isThumbDown = false;
  } else {
    baseDown++;
    if (isThumbUp) {
      baseUp--;
      isThumbUp = false;
    }
    isThumbDown = true;
  }

  thumupNum.textContent = baseUp;
  thumdownNum.textContent = baseDown;
});

const messageInput = document.getElementById("messageInput");
const addCommentBtn = document.getElementById("addCommentBtn");
const cancelCommentBtn = document.getElementById("cancelCommentBtn");
const commentContainer = document.getElementById("comment-container");
const commentTemplate = document.getElementById("comment-template");

// 댓글 등록 버튼
messageInput.addEventListener("focus", function() {
  addCommentBtn.style.display = "inline-block";
  cancelCommentBtn.style.display = "inline-block";
});
// 댓글 취소 버튼
cancelCommentBtn.addEventListener("focus", function() {
  addCommentBtn.style.display = "none";
  cancelCommentBtn.style.display = "none";
});

// 댓글 추가 함수
function addComment() {
  const text = messageInput.value.trim();
  if (!text) return;

  const newComment = commentTemplate.cloneNode(true);
  newComment.removeAttribute("id");
  newComment.classList.remove("comment-template");
  newComment.style.height = "100px";
  newComment.classList.add("d-flex", "align-items-start");

  // 사용자 정보 채우기
  newComment.querySelector("[data-avatar]").src = "../img/dory.jpg";
  newComment.querySelector("[data-user]").textContent = "You";
  newComment.querySelector("[data-time]").textContent = "방금 전";
  newComment.querySelector("[data-comment]").textContent = text;
  newComment.querySelector("[data-likes]").textContent = "0";
  newComment.querySelector("[data-dislikes]").textContent = "0";

  commentContainer.prepend(newComment);
  messageInput.value = "";
}

addCommentBtn.addEventListener("click", addComment);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addComment();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id");
  const iframe = document.getElementById("youtube-frame");
  const videoTitle = document.getElementById("youtube-title");
  const videoIcon = document.getElementById("youtube-icon");
  const videoViews = document.getElementById("owner-views");
  const videoUploadDate = document.getElementById("owner-uploadDate");
  const videoUploader = document.getElementById("youtube-uploader");
  const videoSubs = document.getElementById("youtube-subs");
  const videofullText = document.getElementById("owner-text");


  fetch("../data/package.json")
    .then(res => res.json())
    .then(data => {
      // 1. iframe에 영상 삽입 (video.html?id=... 페이지인 경우)
      if (videoId) {
        const video = data.find(v => v.videoId === videoId);
        if (video) {
          if (iframe) {
            iframe.src = video.iframeurl;
          }
        } else {
          console.error("해당 영상 정보를 찾을 수 없습니다.");
        }

        videoTitle.textContent = video.title;
        videoTitle.setAttribute("title", video.title);
        videoIcon.src = "../" + video.icon;
        videoViews.textContent = "조회수 " + video.views;
        videoUploadDate.textContent = video.uploadDate;

        videoUploader.textContent = video.uploader;
        videoSubs.textContent = video.subscriberCount || ""; // 없으면 빈 문자열
        videofullText.textContent = video.fullText;

      }

      // 2. 목록 카드 생성 (video-list가 있는 경우)
      const container = document.getElementById("video-list");
      const template = document.getElementById("card-template");

      if (container && template) {
        data.forEach(video => {
          const card = template.cloneNode(true);
          card.removeAttribute("id");
          card.style.display = "";

          card.querySelector("a").href = `video.html?id=${video.videoId}`;
          card.querySelector("[data-thumbnail]").src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
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
      }
    })
    .catch(err => console.error("JSON 로딩 실패:", err));
});

