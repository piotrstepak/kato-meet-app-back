import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res) {
        // try ?
        try {
            const user = await User.findOne(req.user._id);
            const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
            res.status(200).send({
                user: user,
                accessToken: token
            });
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async register(req, res) {
        const { name, age, email, password, images } = req.body;
        try {
            const user = new User({ name, age, email, images });
            await User.register(user, password);

            res.json('New user created successfully. Now you can log in.');
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async registerMock(req, res) {
        const { name, age, email, password, images, description, sex } = req.body;
        try {
            const user = new User({ name, age, email, images, description, sex });
            await User.register(user, password);

            res.json('New MOCK user created successfully. Now you can log in.');
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    }
}
