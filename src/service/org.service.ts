import IOrg from "../interface/org.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class OrgService {
  //create a new org
  async create(orgData: IOrg) {
    return await prisma.organizations.create({ data: orgData });
  }

  async addUsers(orgId: string, user: string, ownerId: string) {
    const organisation = await prisma.organizations.findFirst({
      where: { orgId, ownerId },
    });
    if (organisation) {
      return await prisma.organizations.update({
        where: { orgId: organisation.orgId },
        data: {
          users: [...organisation.users, user],
        },
      });
    }
  }

  //find an Organization
  async findById(id: string, userId: string) {
    return await prisma.organizations.findFirst({
      where: { orgId: id, ownerId: userId },
    });
  }

  async findAll(userId: string) {
    return await prisma.organizations.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        orgId: true,
        name: true,
        description: true,
      },
    });
  }
}
