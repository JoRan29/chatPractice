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
let buttons = document.querySelectorAll("button");

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
let chatUI = new ChatUI(chatlist);

// Messages
chatroom1.getChats(data => {
  //   console.log(data);
  chatUI.templateLI(data);
});

// Check when loading the page which room was visited last and load that one
let checkRoom = () => {
  if (localStorage.roomLS) {
    return localStorage.roomLS;
  } else {
    return "general";
  }
};

chatroom1.updateRoom(checkRoom());

// to last visited room - add class that adds color

buttons.forEach(b => {
  if (b.id == checkRoom()) {
    b.classList.add("btn-selected");
  }
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
  let patternUsername = /^\S*$/;
  if (patternUsername.test(usr)) {
    divUpdatedUsername.innerHTML = `Username has been updated to <span id="spanUsername">${usr}</span>!`;
  }
  // divUpdatedUsername.innerHTML = `Username has been updated to <span id="spanUsername">${usr}</span>!`;
  setTimeout(() => {
    divUpdatedUsername.innerHTML = ``;
  }, 3000);
});

// refresh chat page when username changes

chatUI.clear();
chatroom1.getChats(data => {
  chatUI.templateLI(data);
});

// chatroom change
rooms.addEventListener("click", e => {
  if (e.target.tagName == "BUTTON") {
    // highlight selected room, add class to that button
    buttons.forEach(b => {
      if (b.classList.contains("btn-selected")) {
        b.classList.remove("btn-selected");
      }
    });
    let btnId = e.target.getAttribute("id");
    let btn = document.getElementById(btnId);
    btn.classList.add("btn-selected");
    // remove msg from the window
    chatUI.clear();
    // change the chatroom
    let newRoom = e.target.getAttribute("id");
    chatroom1.updateRoom(newRoom);
    localStorage.setItem("roomLS", newRoom);
    // load msg from new chatroom
    chatroom1.getChats(data => {
      //   console.log(data);
      chatUI.templateLI(data);
    });
  }
});
