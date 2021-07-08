import { verifyToken, isAdmin, isModerator } from '../middleWares/authJwt.js';
import {allUsers, updateUsers} from '../controllers/user.controller.js';
import express from "express";

const router = express.Router();

router.get('/all', async (req, res) => {
  const response = await allUsers();
  res.send(response);
});

router.post('/updateUsers', async (req, res) => {
  const response = await updateUsers(req);
  res.send(response);
})




export default router;