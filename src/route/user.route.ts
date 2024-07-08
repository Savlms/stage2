import express from "express";
import UserController from "../controller/user.controller";
// import validate from '../middlewares/validation.middleware'
// import authorize from '../middlewares/authorization.middleware';
// import authenticate from '../middlewares/authentication.middleware';
import autheticate from "../middleware/authentication.middleware";
const router = express.Router();

const {
  findOne,
  // findAll,
  // updateUser,
  // deleteUser,
  // login,
  // signup,
  // logout,
} = new UserController();

// router.post("api/v1/users", validate(createUserSchema), createUser);
// router.patch("/:id", validate(editUserSchema), authenticate, updateUser);
// router.get("/", authenticate, authorize, findAll);
router.get("/:id", autheticate, findOne);
// router.post('/auth/register')
// router.post('/auth/login', login)
// router.get('/auth/login', login)
// router.post('/logout', logout)
// router.post('/', validate(signUpSchema), signup)

export default router;
