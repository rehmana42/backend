import express from 'express'
import { getProfile, Login, Registor, setProfile } from '../controller/userController.js';
import { AuthUser } from '../middlewere/Auth.js';

export const userRouter=express.Router();

userRouter.post('/registor',Registor);
userRouter.post('/login',Login)
userRouter.post('/update',AuthUser,setProfile)
userRouter.get('/getprofile',AuthUser,getProfile)

