// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
let modal = document.getElementById("modal");
modal.classList.add("hidden");

document.addEventListener("DOMContentLoaded", function () {
  const allHearts = document.getElementsByClassName("like-glyph");
  for (let heart of allHearts) {
    buildsHeartEvent(heart);
  }
});

//Handles the hearts' click event
function buildsHeartEvent(t) {
  t.addEventListener("click", (e) => {
    eTarget = e.target;
    const getReq = mimicServerCall()
      .then((res) => handleSuccessfulRequest(res, eTarget))
      .catch((res) => handleError(res, eTarget));
  });
}

//If server request fails
function handleError(res, e) {
  modal.textContent = res;
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("hidden"), 3000);
}

//If server requests succeeds
function handleSuccessfulRequest(res, e) {
  if (e.textContent == EMPTY_HEART) {
    e.textContent = FULL_HEART;
    e.classList.add("activated-heart");
  } else {
    e.classList.remove("activated-heart");
    e.textContent = EMPTY_HEART;
  }
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
