import jwt from 'jsonwebtoken'
import { NextFunction, Request,Response } from 'express'
import AuthRequest from '../interface/auth.interface'
import UserService from '../service/user.service'

const {
    findById
} = new UserService()

async function autheticate(req: Request, res: Response, next: NextFunction) {
   const SECRET = process.env.SECRET
   const token: any = req.cookies
   console.log(token)

   if(!token) {
    return res.status(401).send({
        message: 'Token not provided',
        success: false
    })
   }
   
   const decodedToken = jwt.verify(token, SECRET!)
   const id = (decodedToken as any)._id
   const user = await findById(id)
   if (!user) {
    return res.status(401).send({
        message: "User does not exist",
        success: false
    })
   }

   (req as AuthRequest).user = user
   next()
}

export default autheticate;