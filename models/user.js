import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    image: String,
    age: {
        type: Number,
        min: 18,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedUsers: Array,
    dislikedUsers: Array,
    likedBy: Array,
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

export default User;
