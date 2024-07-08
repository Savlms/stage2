import AuthService from "../service/auth.service";
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import IUser from "../interface/user.interface";
import OrgService from "../service/org.service"

const {
    create,
    update,
    // findAll,
    findByEmail,
    // validateId,
    // erase,
    // findOneByFilter
} = new AuthService();

const {create:createOrg} = new OrgService

export default class AuthController {


        //sign up or create a user
        async signup(req: Request, res: Response) {
            try {
                const userData = req.body;
    
                // Check if email already exists
                const existingUser = await findByEmail(userData.email);
                if (existingUser) {
                    return res.status(409).send({
                        message: 'Email already exists',
                        success: false
                    });
                }
    
                // Hash the password
                const hashedPassword = await bcrypt.hash(userData.password, 10);
    if(hashedPassword){
    // Create the new user
                // only guest can use this route cuz you're not expecting role
                const newUser = await create({
                    firstName:userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: hashedPassword, // Store hashed password
                    phoneNumber: userData.phoneNumber                    
                });

                if(newUser){       
                    // create a new org
                    const newOrg = await createOrg({
                        name:`${newUser.firstName}'s Organisation`,
                        description:`This is ${newUser.firstName} Organization, you are welcome`,
                        ownerId: newUser.userId
                    }) 
                        // Generate JWT token
                    const token = jwt.sign({
                        _id: newUser.userId,
                        username: newUser.email,
                    }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) });
        
                    // only return the needed fields of user
                    res.cookie('token', token, { httpOnly: true,secure:false, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
                        message: 'User registered successfully',
                        success: true,
                        data: {newUser}
                    });
                }
    }
            
    
    
            } catch (err: any) {
                res.status(500).send({
                    message: 'Failed to register user',
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

        