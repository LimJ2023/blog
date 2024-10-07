const chatController = require("../controllers/chat.controller");
const usercontroller = require("../controllers/user.controller");

module.exports = function (io) {
    //말하는 함수 emit()
    //듣는 함수 on()
    io.on("connection", async (socket) => {
        console.log("client is connected : ", socket.id);

        socket.on("login", async (userName, cb) => {
            console.log("backend : ", userName);

            try {
                //유저정보를 저장하는 함수 (유저이름과 소켓아이디)
                const user = await usercontroller.saveUser(userName, socket.id);
                console.log("Saved user: ", user);
                cb({ ok: true, data: user });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("sendMessage", async (message, cb) => {
            try {
                //socket id로 유저 찾기
                const user = await usercontroller.checkUser(socket.id);
                //메세지 저장
                const newMessage = await chatController.saveChat(message, user);
                console.log("뉴 메시지의 값 : ", newMessage);
                io.emit("message", newMessage);
                cb({ ok: true });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    });
};
