export class ChatUI {
  constructor(l) {
    this.list = l;
  }
  get list() {
    return this._list;
  }
  set list(l) {
    this._list = l;
  }
  formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let min = date.getMinutes();

    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cm = date.getMonth() + 1;
    let cy = date.getFullYear();

    let strDate = "";

    // Turning dates into string and setting 0 before single-digit numbers
    d = String(d).padStart(2, "0");
    m = String(m).padStart(2, "0");
    min = String(min).padStart(2, "0");
    h = String(h).padStart(2, "0");

    // Present or Past Messages
    if (d == cDay && m == cm && y == cy) {
      strDate = h + ":" + min;
      return strDate;
    } else {
      strDate = d + "." + m + "." + y + "." + " - " + h + ":" + min;
      return strDate;
    }
  }
  // method for making li items template
  // data is object, doc from db
  templateLI(data) {
    let date = data.created_at.toDate();
    let strDate = this.formatDate(date);
    let htmlLI = `<li `;
    if (data.username == localStorage.usernameLS) {
      htmlLI += `class="me">`;
    } else {
      htmlLI += `class="not-me">`;
    }
    htmlLI += `
    <span class="username">${data.username}:</span> 
    <span class="message">${data.message}</span>
    <div class="date">${strDate} <span id="bin"><img width="25px" src="https://cdn3.iconfinder.com/data/icons/cleaning-icons/512/Trash_Can-512.png"> </span></div>
    </li>`;
    this.list.innerHTML += htmlLI;
    this.list.scrollTop = this.list.scrollHeight;
  }
  clear() {
    this.list.innerHTML = ``;
  }
}
