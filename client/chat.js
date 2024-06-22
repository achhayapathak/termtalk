
const startChat = (name, socket, rl) => {
  rl.on("line", (input) => {
    socket.emit("message", { name, message: input });
  });

  socket.on("message", (data) => {
    if (data.name !== name) {
      console.log(`${data.name}: ${data.message}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    rl.close();
  });
};

module.exports = startChat;