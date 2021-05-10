import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateJWT = (
    req : any, 
    res : any, 
    next : NextFunction
) => {
    const {
        jwt_token
    } = req.headers;

    console.log(`in authenticateJWT middleware, jwt_token: ${jwt_token}`);

    if (jwt_token === null) return res.sendStatus(401)

    jwt.verify(jwt_token as string, process.env.TOKEN_SECRET, (err: any, user: any) => {
        
        console.log(err)

        if (err) {
            return res.sendStatus(403);
        }
        else {
            next();
        }

        // req.user = user
    })

    // return res.sendStatus(200);
}

export default authenticateJWT;