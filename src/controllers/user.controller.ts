import { Request, Response } from "express";
import userValidator from "../validators/user.validator";

require("dotenv").config();

class UserController {
  async create(req: Request, res: Response): Promise<any> {
    const formData = req.body

    try {
      
      await userValidator.validateForm(formData)
      return res.status(200).json({message: 'rota funcionando'})

    } catch (error) {
      return res.status(400).json({
        error: error
      })
    }


  }  
}

export default new UserController();
