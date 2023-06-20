import { Request, Response } from "express";

require("dotenv").config();

class UserController {
  async create(req: Request, res: Response): Promise<any> {
    return res.status(200).json({message: 'rota funcionando'})
  }

  
}

export default new UserController();
