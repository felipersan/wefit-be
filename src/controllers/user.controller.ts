import { Request, Response } from "express";
import userValidator from "../validators/user.validator";
import userService from "../services/user.service";

require("dotenv").config();

class UserController {
  async create(req: Request, res: Response): Promise<any> {
    const formData = req.body;

    try {
      await userValidator.validateForm(formData);

      await userService.registryUser(formData);

      return res.status(200).json({ message: "user created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error,
      });
    }
  }
}

export default new UserController();
