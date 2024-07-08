import IOrg from "../interface/org.interface";
 import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default class OrgService {

    //create a new org
    async create (orgData: IOrg) {
        return await prisma.organizations.create({data:orgData})
    }


    //find an Organization
    async findById (id: string) {
        return await prisma.organizations.findFirst({where:{orgId:id}})
    }

    async findAll(){
        return await prisma.organizations.findMany()
    }


}