1. created basic html and css
2. connected to firestore(database)
3. created chat.js (connected to html)
    3.1 created class Chatroom with constructor, getters and setters (username, room and chats)
    3.2 created async function addChats(with msg parameter)
    3.3 created method getChats -listens for the changes and records the changes when something added 
    3.4 created updateRoom method
4. created app.js (connects chat.js and ui.js)
    4.1 created class objects 
    4.2 DOM elements 
    4.3 mathods for checking, changing username
    4.4 added function for adding messages 
    4.5 added function for room change 
5. created ui.js (user interface)
    5.1 added functionality to user interface 
    5.2 formatted li elements 
    5.3 formatted date elements 
    5.4 method clear for removing ul list from user interface