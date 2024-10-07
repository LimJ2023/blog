const mysql = require("mysql2/promise");

const dbConfig = {
    host: "localhost",
    user: "sol",
    password: "soldesk903!!",
    database: "chat",
};

const usercontroller = {};

usercontroller.saveUser = async (userName, sid) => {
    const connection = await mysql.createConnection(dbConfig);

    try {
        // 이미 있는 유저인지 확인
        const [rows] = await connection.execute(
            "SELECT * FROM User WHERE name = ?",
            [userName]
        );

        if (rows.length === 0) {
            // 없다면 새로 유저정보 만들기
            await connection.execute(
                "INSERT INTO User (name, token, isOnline) VALUES (?, ?, ?)",
                [userName, sid, true]
            );
        } else {
            // 있는 유저라면 연결정보 token값만 바꿔주자
            await connection.execute(
                "UPDATE User SET token = ?, isOnline = ? WHERE name = ?",
                [sid, true, userName]
            );
        }
        const user = rows[0];
        return user;
    } catch (error) {
        console.error("Error saving user:", error);
    } finally {
        await connection.end();
    }
};

usercontroller.checkUser = async (sid) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
        "SELECT * FROM User WHERE token = ?",
        [sid]
    );
    if (!rows) {
        throw Error("user not found");
    }
    const user = rows[0];
    console.log("체크유저의 값 : ", user);
    return user;
};

module.exports = usercontroller;

// const User = require("../Models/user");

// const usercontroller = {};

// usercontroller.saveUser = async (userName, sid) => {
//     //이미 있는 유저인지 확인
//     let user = await User.findOne({ name: userName });
//     //없다면 새로 유저정보 만들기
//     if (!user) {
//         user = new User({
//             name: userName,
//             token: sid,
//             online: true,
//         });
//     }
//     // 있는 유저라면 연결정보 token값만 바꿔주자
//     user.token = sid;
//     user.online = true;

//     await user.save();
// };

// module.exports = usercontroller;
