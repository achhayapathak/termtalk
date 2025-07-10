require("stylesh");
const { colors } = require("../utils/colorList.json");
let myColorIndex;
const startChat = (name, socket, rl) => {
  rl.on("line", (input) => {
    socket.emit("message", { name, message: input, color: myColorIndex ? myColorIndex : 0 });
  });

  // Handle messages from server, but also has fallback if using older versions of termtalk by giving them a basic white frame
  // if no color is provided to the client, or the server. This also helps indicate that there is something/someone out of date.
  socket.on("message", (data) => {
    if (data.name !== name) {
      console.log(`${data.name}: ${data.message}`.createRoundedBorder(data.color ? colors[data.color].toString() : "white"));
    } else {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine();
      console.log(`${data.name}: ${data.message}`.createRoundedBorder(myColorIndex ? colors[myColorIndex].toString() : "white"));
    }
  });

  socket.on("user-join", (data) => {
    if (data.username !== name) {
      console.log(`${data.message}`.color("yellow").createDottedBorder("yellow"));
    } else if (data.username === name) {
      myColorIndex = data.color
      console.log(`${data.message}`.color("green").createDottedBorder("green"));
    }
  });

  //User has left chat
  socket.on("bye-bye", (data) => {
    console.log(`${data.message}`.color("red").createDottedBorder("red"));
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected from server`.createDashedBorder("green"));
    rl.close();
  });
};

module.exports = startChat;