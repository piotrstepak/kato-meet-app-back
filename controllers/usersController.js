import User from '../models/user.js';

// export default function getAllUsers(req, res) {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json(`Error: ${err}`))
// }


const getAllUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
}

export default getAllUsers;
