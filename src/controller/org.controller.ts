import OrgService from "../service/org.service";
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import AuthRequest from "../interface/auth.interface";


const {create,findById,findAll} = new OrgService

export default class AuthController {


        // create a org
        async create (req: Request, res: Response) {
            try {
                const orgData = req.body; 
                const authReq = req as AuthRequest;
                const user = authReq.user;
              
                if (!user) {
                  return res.status(401).send({
                    message: 'Unauthorized',
                    success: false,
                  });
                }

                const newOrg = await create({
                    name:orgData.name,
                    description: orgData.name,
                    ownerId:  orgData.userId!                
                });

                if(newOrg){
                    res.status(201).send({
                        status: "success",
                        message:"Organisation created successfully",
                        data:{
                            orgId:newOrg.orgId,
                            name:newOrg.name,
                            description: newOrg.description
                        }})
                }
      

    }
                
     catch (err: any) {
                res.status(500).send({
                    message: 'Failed to create Organisation',
                    success: false,
                    error: err.message
                });
            }
        }

    // //edit a user
    // async updateUser(req: Request, res: Response) {
    //     const data = req.body
    //     const id = req.params.id

    //     if (!await validateId(id)) {
    //         return res.status(400).send({
    //             message: 'Invalid Id',
    //             success: false
    //         })
    //     }
    //     //checks if user exists
    //     const user = findById(id)
    //     if (!user) {
    //         return res.status(404).send({
    //             message: 'User not found',
    //             success: false
    //         })
    //     }

    //     //if it exists you update the user
    //     //hash password again and return only needed fields
    //     if (data.password) {
    //         const hashedPassword = await bcrypt.hash(data.password, 10);
    //         data.password = hashedPassword;
    //     }
    //     const updatedUser = await update(id, data);
    //     const { _id, email } = updatedUser!;
    //     return res.status(200).send({
    //         message: 'Update successfully',
    //         success: true,
    //         data: { _id, email }
    //     })
    // }


    // //find a single user
    // async findOne(req: Request, res: Response) {
    //     const id = req.params.id

    //     if (!await validateId(id)) {
    //         return res.status(400).send({
    //             message: 'Invalid Id',
    //             success: false
    //         })
    //     }

    //     const user = await findById(id)
    //     if (!user) {
    //         return res.status(404).send({
    //             message: 'User not found',
    //             success: false
    //         })
    //     }
    //     // only return the needed fields of user
    //     return res.status(200).send({
    //         message: 'User found',
    //         success: true,
    //         data: user
    //     })
    // }

    // //find all users
    // async findAll(req: Request, res: Response) {
    //     const getAll = await findAll()
    //     // only return the needed fields of users
    //     return res.status(200).send({
    //         message: 'Users found successfully',
    //         success: true,
    //         data: getAll
    //     })
    // }

    // //move these 2 to auth controller and let their route be /auth instead of /user
    // //Login
    // async login(req: Request, res: Response) {
    //     const email = req.body.email
    //     const user = await findByEmail(email)
    //     if (!user) {
    //         return res.status(404).send({
    //             message: 'Invalid Email or Password',
    //             success: false
    //         })
    //     }

    //     const isValid = await bcrypt.compare(req.body.password, user.password)
    //     if (!isValid) {
    //         return res.status(404).send({
    //             message: 'Invalid Username or Password',
    //             success: false
    //         })
    //     } else {
    //         const token = jwt.sign({ _id: user._id, username: user.email, role: user.role }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) })
    //         res.cookie("token", token, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) })
    //         // only return the needed fields of user
    //         return res.status(200).send({
    //             message: 'Login Successful',
    //             success: true,
    //             data: {email:user.email,role:user.role, token}
    //         })
    //     }
    // }


    // //logging a user out
    // async logout(req: Request, res: Response) {
    //     res.cookie("token", '', {
    //         httpOnly: true, maxAge: 1 
    //     });
    //     return res.status(200).send({
    //         message: 'Logged Out',
    //         success: true
    //     });
    // }


    }

        