import jwt from 'jsonwebtoken';
import {secret} from './../config.js';

const authMiddlware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'user is unauthorized'});
        }
        req.user = jwt.verify(token, secret);
        next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({message: 'user is unauthorized'});
    }
}

export default authMiddlware;
