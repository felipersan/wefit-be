import express, { Request, Response } from "express";
import sellerController from "../controllers/seller.controller";
const router = express.Router();

router.use(express.json());

router.post("/", sellerController.create)

export default router;
