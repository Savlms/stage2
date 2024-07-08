import express from 'express'
import AuthController from '../controller/auth.controller'
// import validate from '../middlewares/validation.middleware'
// import authorize from '../middlewares/authorization.middleware';
// import authenticate from '../middlewares/authentication.middleware';
const router = express.Router();

const {
    signup,  
} = new AuthController()


//router.post('api/v1/users', validate(createUserSchema), createUser)
// router.patch('/:id', validate(editUserSchema), authenticate, updateUser)
// router.get('/',authenticate, authorize , findAll)
// router.get('/:id',authenticate, findOne)
router.post('/auth/register',signup)
// router.post('/auth/login', login)
// router.get('/auth/login', login)
// router.post('/logout', logout)
// router.post('/', validate(signUpSchema), signup)



export default router