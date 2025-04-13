import express from 'express'
import { google, signin, signup, logout } from '../controllers/authController.js';
const authrouter=express.Router();
authrouter.post("/signup",signup);
authrouter.post("/signin",signin);
authrouter.post("/google",google);
authrouter.post("/logout", logout); 
export default authrouter;