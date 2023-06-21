import express, { Request, Response } from "express";
import session from 'express-session'
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8081;

app.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
  })
)

app.use(cors());

import userRoutes from "./routes/user.routes";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.info('server running')
});
