import express from 'express';
import User from '../models/user.js';
//todo separate part of code to controllers

const router = express.Router();

// router.route('/').get((req, res) => {
//     User.findById('5fcfbfbd3269ec31f42cbd47')//req.id / receive loggeduser id from front
//         .then(loggedUser => {
//             // console.log('user')//helper print
//             // console.log(loggedUser.name)//helper print
//             User.find(
//                 { $and: [
//                         { '_id': { $ne: loggedUser._id }},
//                         { '_id': { $nin: loggedUser.likedUsers }},
//                         { '_id': { $nin: loggedUser.dislikedUsers }}
//                     ]}
//                 )
//                 .then(user => {
//                     console.log(user);//helper print
//                     return res.status(200).send(user)
//                 })
//         })
//         .catch(err => res.status(400).json(`Error: ${err}`))
// })

//find logged user, compare likedBy with likedUsers and return matching
// router.route('/matches').get((req, res) => {
//     User.findById('5fcfbfbd3269ec31f42cbd47')//req.id / receive loggeduser id from front
//         .then(loggedUser => {
//             User.find(
//                 { $and: [
//                         { '_id': { $in: loggedUser.likedUsers }},
//                         { '_id': { $in: loggedUser.likedBy}}
//                     ]}
//                 )
//                 .then(user => {
//                     console.log(user);//helper print
//                     return res.status(200).send(user)
//                 })
//         })
//     })

            // const user = User.find()
            //     .then(users => users.filter(user => {
            //         return user._id !== loggedUser._id;
            //     })).then(user => console.log(user))

            // User.find()
            //     // .then(loggedUser => res.json(loggedUser))
            //     .then(users => users.filter(user => {
            //         return (
            //             (user._id !== loggedUser._id)
            //             &&
            //             (!loggedUser.dislikedUsers.includes(user._id))
            //             &&
            //             (!loggedUser.likedUsers.includes(user._id))
            //         )
            //     }))


    // const checkUser = user => {
    //     return (
    //         (user.id !== loggedUser._id)
    //         &&
    //         (!loggedUser.dislikedUsers.includes(user._id))
    //         &&
    //         (!loggedUser.likedUsers.includes(user.id))
    //     )
    // }
    //
    // User.find()
    //     .then(users => users.filter(user => checkUser(user)))
    //     .then(users => res.json(users[0]))//return the first user that meets the requirements
    //     .catch(err => res.status(400).json(`Error: ${err}`))


export default router;
