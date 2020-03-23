// class Chatroom

export class Chatroom {
  constructor(u, r) {
    this.username = u;
    this.room = r;
    this.chats = db.collection("chats");
    this.unsub;
  }
  // Getters and Setters
  get username() {
    return this._username;
  }
  set username(u) {
    let patternUsername = /^\S*$/;
    if (patternUsername.test(u)) {
      this._username = u;
    } else {
      alert("Username not valid!");
    }
  }
  get room() {
    return this._room;
  }
  set room(r) {
    this._room = r;
  }
  get chats() {
    return this._chats;
  }
  set chats(c) {
    this._chats = c;
  }
  async addChat(msg) {
    // Getting date for timestamp
    let date = new Date();
    // Creating obj for db
    let docChat = {
      message: msg,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date)
    };
    // sending and saving the doc into the db
    let response = await this.chats.add(docChat);
    return response;
  }
  // Method for checking for changes in the db
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          // If msg == added, then update
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
  }
  updateUsername(uu) {
    // uu - updated username
    // only changes username locally, not in a db
    this.username = uu;
    localStorage.setItem("usernameLS", uu);
  }
  updateRoom(ur) {
    // ur - update room
    this.room = ur;
    // console.log("Room successfully updated!");
    if (this.unsub) {
      this.unsub();
    }
  }
}
