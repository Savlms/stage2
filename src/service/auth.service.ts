import IUser from "../interface/user.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class AuthService {
  //create a user
  async create(userData: IUser) {
    return await prisma.user.create({
      data: userData,
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  //edit a user
  async update(id: string, update: Partial<IUser>) {
    return await prisma.user.update({
      where: {
        userId: id,
      },
      data: update,
    });
  }

  async findByEmail(email: string) {
    console.log(email);
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  // //find a single user by username
  // async findByUsername (username: string) {
  //     return await userModel.findById({username: username})
  // }

  // //find all users
  // async findAll () {
  //     return await userModel.find()
  // }

  // //delete a user
  // async erase (id: string) {
  //     return await userModel.findByIdAndDelete(id)
  // }
}
