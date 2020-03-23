// Module
import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// DOM elements
let chatlist = document.querySelector("#ulMessages");
let formMsg = document.querySelector("#formMessage");
let inputMsg = document.querySelector("#inputMessage");
let formUsr = document.querySelector("#formUsername");
let inputUsr = document.querySelector("#inputUsername");
let rooms = document.querySelector("nav");
let divUpdatedUsername = document.querySelector("#divUpdatedUsername");

// Checking username in LocalStorage

let checkUsername = () => {
  if (localStorage.usernameLS) {
    return localStorage.usernameLS;
  } else {
    return "anonymous";
  }
};

// Objects
let chatroom1 = new Chatroom(checkUsername(), "js");
console.log(chatroom1);

let chatUI = new ChatUI(chatlist);

// Messages
chatroom1.getChats(data => {
  //   console.log(data);
  chatUI.templateLI(data);
});

// sends message when we press Send btn
formMsg.addEventListener("submit", e => {
  e.preventDefault();
  let msg = inputMsg.value;
  chatroom1
    .addChat(msg)
    .then(() => {
      //   console.log(`Message has been added!`);
      formMsg.reset();
    })
    .catch(err => {
      console.error(`An error has occured: ${err}`);
    });
});

// change username when we press Update btn
formUsr.addEventListener("submit", e => {
  e.preventDefault();
  let usr = inputUsr.value;
  //   console.log(usr);
  chatroom1.updateUsername(usr);
  formUsr.reset();
  // show new msg for 3 sec for updated username
  divUpdatedUsername.innerHTML = `Username has been updated to ${usr}!`;
  setTimeout(() => {
    divUpdatedUsername.innerHTML = ``;
  }, 3000);
});

// chatroom change
rooms.addEventListener("click", e => {
  if (e.target.tagName == "BUTTON") {
    // remove msg from the window
    chatUI.clear();
    // change the chatroom
    let newRoom = e.target.getAttribute("id");
    chatroom1.updateRoom(newRoom);
    // load msg from new chatroom
    chatroom1.getChats(data => {
      //   console.log(data);
      chatUI.templateLI(data);
    });
  }
});
