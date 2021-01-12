import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res) {
        // try ?
        try {
            const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
            res.send(token);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async register(req, res) {
        const { name, age, email, password } = req.body;
        try {
            const user = new User({ name, age, email });
            await User.register(user, password);

            res.json('New user created successfully. Now you can log in.');
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    }
}
