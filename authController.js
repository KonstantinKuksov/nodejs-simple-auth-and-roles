import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import {secret} from './config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }
    return jwt.sign(payload, secret, {expressIn: '24h'});
}

class AuthController {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json({users});
        } catch (e) {
          console.log(e);
          res.status(400).json({message: 'Error'});
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'registration error', errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: `user with name ${username} is already exist`})
            }
            const hashedPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashedPassword, role: [userRole.value]});
            await user.save();
            return res.json({message: 'user was registered successfully'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'registration error'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                res.status(400).json({message: `user ${username} doesn\'t exist`});
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({message: 'incorrect password'});
            }
            const token = generateAccessToken(user._id, user.roles);
            res.status(200).json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'login error'});
        }
    }
}
export default new AuthController();
