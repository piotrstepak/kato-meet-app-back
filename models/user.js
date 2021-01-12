import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    image: String,
    age: {
        type: Number,
        // min: 18,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    likedUsers: Array,
    dislikedUsers: Array,
    likedBy: Array,
}, {
    timestamps: true,
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', userSchema);
