import User from '../models/user.js';

export default {
    async nextUserToDisplay(req, res) {
        try {
            const loggedUserId = req.body.id;
            const loggedUser = await User.findById(loggedUserId);
            const userToDisplay = await User.findOne(
                { $and: [
                        { '_id': { $ne: loggedUser._id }},
                        { '_id': { $nin: loggedUser.likedUsers }},
                        { '_id': { $nin: loggedUser.dislikedUsers }}
                    ]}
            );

            res.json(userToDisplay);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

    // implement eg 5/7 matches per page
    async matches(req, res) {
        try {
            const loggedUserId = req.body.id;
            const loggedUser = await User.findById(loggedUserId);
            const users = await User.find(
                { $and: [
                        { '_id': { $in: loggedUser.likedUsers }},
                        { '_id': { $in: loggedUser.likedBy }}
                    ]}
            );

            res.status(200).send(users);
        } catch (err) {
            res.status(400).json(`Error: ${err}`);
        }
    },

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
                description: req.body.description,
                likedUsers: req.body.likedUsers,
                dislikedUsers: req.body.dislikedUsers,
                likedBy: req.body.likedBy,
                images: req.body.images,
                sex: req.body.sex,
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
            let user = await User.findById(req.params.id);
            const { name, age, email, password, description, images, sex, likedUsers, dislikedUsers, likedBy } = req.body;
            user.name = name;
            user.age = age;
            user.email = email;
            // user.password = password;
            user.description = description;
            user.images = images;
            user.likedUsers = likedUsers;
            user.dislikedUsers = dislikedUsers;
            user.likedBy = likedBy;
            user.sex = sex;
            // console.log(req.body)
            // user = {...req.body};
            await user.save();

            res.json(`User updated: ${user}`);
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    }
}
