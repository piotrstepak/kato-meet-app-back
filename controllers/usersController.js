import User from '../models/user.js';

export default {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async add(req, res) {
        try {
            const newUser = await new User({
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password,
            }).save();

            res.json(`User added: ${newUser}`);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async findById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async deleteById(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json(`User deleted: ${user}`);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { name, age, email, password } = req.body;
            user.name = name;
            user.age = age;
            user.email = email;
            user.password = password;
            await user.save();
            res.json(`User updated: ${user}`);
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    },

    // async nextUserToDisplay(req, res) {
    //     try {
    //
    //     }
    // }
}
