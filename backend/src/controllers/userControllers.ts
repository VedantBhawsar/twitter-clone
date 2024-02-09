import { Application, Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  followUser,
  followingUser,
  getAllUsers,
  getUserById,
  getUserbyEmail,
  getUserbyUsername,
  unfollowUser,
  updateUserById,
} from "../modals/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtsecret } from "../config";

class UserController {
  public getUsers = async (request: any, response: Response) => {
    try {
      const token1 = request.cookies;
      console.log(token1);
      const user = await getAllUsers();
      response.status(200).json(user);
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public getUser = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await getUserById(id);
      response.status(200).json(user);
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public createUser = async (request: Request, response: Response) => {
    try {
      const { name, surname, email, password, username } = request.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        name,
        surname,
        email,
        password: hashedPassword,
        username,
      };
      const newUser = await createUser(user);
      response.status(200).json(newUser);
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({
        message: error.message,
      });
    }
  };

  public updateUser = async (request: Request, response: Response) => {
    try {
      const existUser = await getUserById(request.params.id);
      if (!existUser) {
        response.status(404).json({
          message: "user not found",
        });
        return;
      }

      const updatedUser = await updateUserById(request.body, request.params.id);
      response.status(200).json(updatedUser);
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public deleteUser = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const existUser = await getUserById(id);
      if (!existUser) {
        response.status(404).json({
          message: "user not found",
        });
      }
      const deletedUser = await deleteUserById(id);
      response.status(200).json(deletedUser);
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public loginUser = async (request: Request, response: Response) => {
    try {
      const { username, password, email } = request.body;
      let existUser;
      console.log(username);
      if (username) {
        existUser = await getUserbyUsername(username);
      }
      if (email) {
        existUser = await getUserbyEmail(email);
      }
      if (!existUser) {
        response.status(404).json({
          message: "user not found",
        });
        return;
      }
      if (await bcrypt.compare(password, existUser?.password)) {
        const token = jwt.sign({ user_id: existUser._id }, jwtsecret, {
          expiresIn: "1h",
        });
        response.cookie("user", token.toString(), {
          httpOnly: true,
          secure: true,
        });
        response
          .status(200)
          .json({ message: "login succesful", user: existUser, jwt: token });
        return;
      } else {
        response.status(404).json({
          message: "password incorrect",
        });
        return;
      }
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
      return;
    }
  };

  public validUsername = async (request: Request, response: Response) => {
    try {
      const { username } = request.params;
      const existUser = await getUserbyUsername(username);
      if (existUser) {
        response.status(404).json({
          available: false,
          message: "username taken",
        });
      } else {
        response.status(200).json({
          available: true,
          message: "username available",
        });
      }
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public followUser = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      await followUser(id, userId);
      response.status(200).json({
        success: true,
      });
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public followingUser = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      await followingUser(id, userId);
      response.status(200).json({
        success: true,
      });
    } catch (error: any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public unfollowUser = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request.body;
      await unfollowUser(id, userId)
      response.status(200).json({
        success: true,
      });
    } catch (error:any) {
      console.log(`[user]: ${error.message}`);
      response.status(500).json({
        error: error.message,
      })
    }
  }
}

export default new UserController();
