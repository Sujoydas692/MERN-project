const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again!', 500);
        return next(error);
       }
       res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs!', 422));
    }

    const { name, email, password, places } = req.body;

    let existingUser;
   try {
    existingUser = await User.findOne({ email: email })
   } catch (err) {
    const error = new HttpError('Signing up failed, please try again!', 500);
    return next(error);
   }

   if (existingUser) {
    const error = new HttpError('User already exsits', 422);
    return next(error);
   }

    const createdUser = new User({
        name,
        email,
        image: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
        password,
        places
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up faild, please try again!', 500);
        return next(error);
    }

    res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
   try {
    existingUser = await User.findOne({ email: email })
   } catch (err) {
    const error = new HttpError('Logging in failed, please try again!', 500);
    return next(error);
   }

   if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid credentials, could not log in!', 401);
    return next(error);
   }

    res.json({message: 'Logged In!', user: existingUser.toObject({getters: true})});
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;