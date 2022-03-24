import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    lastName: String,
    firstName: String,
    middleName: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Users = mongoose.model('Users', usersSchema);

export default Users;