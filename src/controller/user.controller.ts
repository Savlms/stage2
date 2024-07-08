import UserService from "../service/user.service";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import IUser from "../interface/user.interface";

const {
  create,
  update,
  findById,
  // findAll,
  findByEmail,
  // validateId,
  // erase,
  // findOneByFilter
} = new UserService();

export default class UserController {
  //sign up or create a user
  async signup(req: Request, res: Response) {
    try {
      const userData = req.body;

      // Check if email already exists
      const existingUser = await findByEmail(userData.email);
      if (existingUser) {
        return res.status(409).send({
          message: "Email already exists",
          success: false,
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create the new user
      // only guest can use this route cuz you're not expecting role
      const newUser = await create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword, // Store hashed password
        phoneNumber: userData.phoneNumber,
      });

      // Generate JWT token
      const token = jwt.sign(
        {
          _id: newUser.userId,
          username: newUser.email,
        },
        SECRET!,
        { expiresIn: 7 * 24 * 60 * 60 }
      );

      // only return the needed fields of user
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .send({
          message: "User registered successfully",
          success: true,
          data: { email: newUser.email, token },
        });
    } catch (err: any) {
      res.status(500).send({
        message: "Failed to register user",
        success: false,
        error: err.message,
      });
    }
  }

  //edit a user
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

  //find a single user
  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    // if (!await validateId(id)) {
    //     return res.status(400).send({
    //         message: 'Invalid Id',
    //         success: false
    //     })
    // }

    const user = await findById(id);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    // only return the needed fields of user
    return res.status(200).send({
      status: "success",
      message: "User found",
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
      },
    });
  }

  //find all users
  // async findAll(req: Request, res: Response) {
  //     const getAll = await findAll()
  //     // only return the needed fields of users
  //     return res.status(200).send({
  //         message: 'Users found successfully',
  //         success: true,
  //         data: getAll
  //     })
  // }
}
