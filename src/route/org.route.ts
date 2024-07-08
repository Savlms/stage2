import express from "express";
import OrgController from "../controller/org.controller";
import autheticate from "../middleware/authentication.middleware";
// import validate from '../middlewares/validation.middleware'
// import authorize from '../middlewares/authorization.middleware';
// import authenticate from '../middlewares/authentication.middleware';
const router = express.Router();

const { create, findOne, findAll, addUser } = new OrgController();

//router.post('api/v1/users', validate(createUserSchema), createUser)
// router.patch('/:id', validate(editUserSchema), authenticate, updateUser)
router.get("/", autheticate, findAll);
router.get("/:id", autheticate, findOne);
router.post("/", autheticate, create);
router.post("/:orgId/users", autheticate, addUser);
// router.post('/auth/login', login)
// router.get('/auth/login', login)
// router.post('/logout', logout)
// router.post('/', validate(signUpSchema), signup)

export default router;
