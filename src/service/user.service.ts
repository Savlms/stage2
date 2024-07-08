import IUser from "../interface/user.interface";
 import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default class UserService {

    //create a user
    async create (userData: IUser) {
        return await prisma.user.create({data:userData})
    }

    //edit a user
    async update (id: string, update: Partial<IUser>) {
        return await prisma.user.update({
            where:{
                userId:id
            },
            data:update
        })
    }

    //find a single user by id
    async findById (id: string) {
        return await prisma.user.findFirst({where:{userId:id}})
    }

    async findByEmail(email: string){
        return await prisma.user.findFirst({where:{
            email
        }})
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