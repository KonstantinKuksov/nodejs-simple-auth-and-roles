import jwt from 'jsonwebtoken';
import {secret} from './../config.js';
import user from "../models/User.js";

const rolesMiddleware = (roles) => {
    return function(req, res, next){
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const {roles: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            roles.forEach(role => {
                if (userRoles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({message: 'user doesn\'t have necessary permissions'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({message: 'user doesn\'t have necessary permissions'});
        }
    }
}

export default rolesMiddleware;
