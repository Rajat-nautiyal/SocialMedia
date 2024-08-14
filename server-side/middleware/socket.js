export const setSocketIo =async(io)=>{

  const onlineUsers = [];
  // console.log("User");
  
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log("User Connected", socket.id);
      
    if(!onlineUsers.includes(userId)){
      onlineUsers.push(userId);
    }
      io.emit("onlineUsers", onlineUsers);

    socket.on("message", async({ room, chatUser }) => {
      await socket.join(room); 
      if(!chatUser) return;
        console.log({ room, chatUser });
        // console.log(chatUser)
        socket.join(room);
        io.to(room).emit("receive-message", chatUser);
    });
    socket.on("disconnect", () => {
      const index = onlineUsers.indexOf(userId)
      if(index != -1){
        onlineUsers.splice(index, 1);
      }
      io.emit("onlineUsers", onlineUsers);
      console.log("User Disconnected", socket.id);
    });
  })
  
}
