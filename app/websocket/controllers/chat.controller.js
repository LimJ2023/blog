const mysql = require("mysql2/promise");

const dbConfig = {
    host: "localhost",
    user: "sol",
    password: "soldesk903!!",
    database: "chat",
};

const chatController = {};

chatController.saveChat = async (message, user) => {
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [result] = await connection.execute(
            "INSERT INTO Chat (chat, user_id, user_name) VALUES (?, ?, ?)",
            [message, user.id, user.name]
        );

        // 삽입된 메시지의 정보를 반환
        const newMessage = {
            id: result.insertId, // MySQL에서 생성된 자동 증가 ID
            chat: message,
            user: {
                id: user.id,
                name: user.name,
            },
        };

        return newMessage;
    } catch (error) {
        console.error("Error saving chat:", error);
        throw error;
    } finally {
        await connection.end();
    }
};

module.exports = chatController;
