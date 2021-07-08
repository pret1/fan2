import db from '../models/index.js';

const User = db.user;

export const allUsers = async () => {
    const users = [];
    try {
        for await (const doc of User.find()) {
            users.push(doc)
        }
        return ({ status: 200, message: 'Successfull', users: users })
    } catch (error) {
        console.log(error);
        return ({ status: 500, message: error })
    }
};

export const updateUsers = async (req) => {
    try {
        const userList = req.body;

        for (const item of userList) {
            const user_id = item._id;
            const udpate = await User.findByIdAndUpdate(
                user_id,
                {
                    username: item.username,
                    email: item.email,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    role: item.role,
                },
                {
                    returnOriginal: false
                }
            )
            console.log(udpate);
        }
      
        return ({ status: 200, message: 'Successfull' })
    } catch (error) {
        return ({ status: 500, message: error.message })
    }
}
