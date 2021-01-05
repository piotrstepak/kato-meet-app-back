import express from 'express';
import User from '../models/user.js';
// import usersController from 'E:/codecool/react/bigProject/kato-meet-app/kato-meet-app-back/controllers/usersController.js';
// await import(url.pathToFileURL('E:/codecool/react/bigProject/kato-meet-app/kato-meet-app-back/controllers/usersController.js').href);

import usersController from '../controllers/usersController.js';
// const usersController = require('../controllers/usersController');
// import  usersController from '../controllers/usersController';

//todo separate part of code to controllers

const router = express.Router();

router.route('/nextUserToDisplay').get((req, res) => {
    User.findById('5fcfbfbd3269ec31f42cbd47')//req.id / receive loggeduser id from front
        .then(loggedUser => {
            // console.log('user')//helper print
            // console.log(loggedUser.name)//helper print
            User.find(
                { $and: [
                        { '_id': { $ne: loggedUser._id }},
                        { '_id': { $nin: loggedUser.likedUsers }},
                        { '_id': { $nin: loggedUser.dislikedUsers }}
                    ]}
            )
                .then(user => {
                    console.log(user);//helper print
                    return res.status(200).send(user)
                })
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//find logged user, compare likedBy with likedUsers and return matching
router.route('/matches').get((req, res) => {
    User.findById('5fcfbfbd3269ec31f42cbd47')//req.id / receive loggeduser id from front
        .then(loggedUser => {
            User.find(
                { $and: [
                        { '_id': { $in: loggedUser.likedUsers }},
                        { '_id': { $in: loggedUser.likedBy}}
                    ]}
            )
                .then(users => {
                    console.log(users);//helper print
                    return res.status(200).send(users)
                })
        })
})

router.get('/',(req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// router.route('/').get(usersController.getAllUsers);
// router.get('/', usersController.getAllUsers) //???

router.route('/add').post((req, res) => {
    const name = req.body.name;
    // const image = req.body.image;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        name,
        // image,
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

export default router;
