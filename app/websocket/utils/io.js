module.exports = function (io) {
    //말하는 함수 emit()
    //듣는 함수 on()
    io.on("connection", async (socket) => {
        console.log("client is connected : ", socket.id);

        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    });
};
