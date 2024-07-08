import OrgService from "../service/org.service";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import AuthRequest from "../interface/auth.interface";

const { create, findById, findAll, addUsers } = new OrgService();

export default class AuthController {
  // create a org
  async create(req: Request, res: Response) {
    try {
      const orgData = req.body;
      const authReq = req as AuthRequest;
      const user = authReq.user;

      if (!user) {
        return res.status(401).send({
          message: "Unauthorized",
          success: false,
        });
      }
      console.log("this is user  :", user);
      const newOrg = await create({
        name: orgData.name,
        description: orgData.name,
        ownerId: user.userId!,
      });

      if (newOrg) {
        res.status(201).send({
          status: "success",
          message: "Organisation created successfully",
          data: {
            orgId: newOrg.orgId,
            name: newOrg.name,
            description: newOrg.description,
          },
        });
      }
    } catch (err: any) {
      res.status(500).send({
        message: "Failed to create Organisation",
        success: false,
        error: err.message,
      });
    }
  }

  //find a single org
  async findOne(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const user = authReq.user;
    const id = req.params.id;

    try {
      //   if (!await validateId(id)) {
      //       return res.status(400).send({
      //           message: 'Invalid Id',
      //           success: false
      //       })
      //   }

      const org = await findById(id, user?.userId!);
      if (!org) {
        return res.status(404).send({
          message: "Organisation not found",
          success: false,
        });
      }
      // only return the needed fields of user
      return res.status(200).send({
        status: "success",
        message: "Organisation found",
        data: {
          orgId: org.orgId,
          name: org.name,
          description: org.description,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //find all users
  async findAll(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const user = authReq.user;
    try {
      const getAll = await findAll(user?.userId!);
      if (getAll) {
        return res.status(200).send({
          status: "success",
          message: "Organisations found",
          organisations: getAll,
        });
      }
      return res.status(404).send({
        message: "Organisations not found",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // add a user to organisation
  async addUser(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const user = authReq.user;
    const newUser = req.body.userId;
    const orgId = req.params.orgId;
    try {
      const added = await addUsers(orgId, newUser, user?.userId!);
      if (added) {
        return res.status(200).send({
          status: "success",
          message: "User added to organisation",
        });
      }
      return res.status(404).send({
        message: "Organisations not found",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
