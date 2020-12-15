import express from 'express';
import User from '../models/user.js';
//todo separate part of code to controllers

const router = express.Router();

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        name,
        image,
        age,
        email,
        password,
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json('User deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.image = req.body.image;
            user.age = req.body.age;
            user.email = req.body.email;
            user.password = req.body.password;
            user.likedUsers = req.body.likedUsers;
            user.dislikedUsers = req.body.dislikedUsers;
            user.likedBy = req.body.likedBy;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// router.route('/nextUserToDisplay').get((req, res) => {
//     User.find()
//         // .then(users => res.json(users.map(user => user.name === 'Magda'))))
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json(`Error: ${err}`))
// })
// why it doesnt work?

export default router;
