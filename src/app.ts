import express, { Request, Response } from "express";
import session from 'express-session'
import cors from "cors";
import flash from 'connect-flash'

const app = express();

const PORT = process.env.PORT || 8081;

app.use(
  session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
  })
)

app.use(flash())
app.use(cors());

app.use((req: any, res: any, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// importação de rotas
import userRoutes from "./routes/seller.routes";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//rotas
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
