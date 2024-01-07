async function getComment() {
  const response = await fetch("http://localhost:3000/comment");
  const jsonData = await response.json();

  return jsonData;
}

getComment();
const postComment = async (param) => {
  console.log(param);
  const res = await fetch("http://localhost:3000/createcomment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(param),
  });
  return await res.json();
};

const Delete = async (param) => {
  const res = await fetch("http://localhost:3000/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(param),
  });
};

const makeComment = async () => {
  const db = await getComment();
  const commentArea = document.querySelector(".guest__comment-area");
  const htmlList = db.commentList.map((info) => {
    const date = info.time.split("-");
    const time = new Date(...date);
    const curTime = new Date();
    console.log(time, curTime);
    const timeStr = elapsedTime(time, curTime);
    console.log(info.time.split("-"));
    return `<div class="guest__comment">
        <div class="guest__comment__left">
            <div class="guest__comment__left__name">${info.name}</div>
        </div>
        <div class="guest__comment__right">
            <div class="guest__comment__right__text">
                ${info.comment}
            </div>
            <div class="guest__comment__right__time">${timeStr}</div>
        </div>
        <form action = "" class="guest__comment__delete">
          <button>delete</button>
        </form>
        <div class="guest__comment__time">
          ${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}
        </div>
    </div>`;
  });
  const html = htmlList.reduce((a, c) => a + c, "");
  commentArea.innerHTML = html;
};
const elapsedTime = (start, end) => {
  const diff = (end - start) / 1000;

  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
};
const commentBtn = document.querySelector(".guest__form button");
commentBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector(".guest__form input");
  const comment = document.querySelector(".guest__form textarea");

  const time = new Date();
  const timeStr = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

  const state = await postComment({
    name: name.value,
    comment: comment.value,
    time: timeStr,
  });
  if (state) {
    window.location.reload();
  }
});
makeComment();

// const deleteBtn = document.querySelector(".guest__comment__delete button");
// deleteBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   console.log("delete button clicked");
//   const name = document.querySelector(".guest__comment__left__name");
//   const comment = document.querySelector(".guest__comment__right__text");
//   const time = document.querySelector(".guest__comment__time");
//   const state = await Delete({
//     name: name.value,
//     comment: comment.value,
//     time: time.value,
//   });
//   if (state) {
//     window.location.reload();
//   }
// });
