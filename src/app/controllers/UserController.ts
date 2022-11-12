import User from "../../models/UserModel";
import JWT from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let { name, email, password } = req.body;

    let hasUser = await User.findOne({ email });
    if (!hasUser) {
      let newUser = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });

      const token = JWT.sign(
        { id: newUser._id, name: newUser.name, email: newUser.email },
        process.env.JWT_SECRET_KEY as string
      );

      res.status(201).json({ token, name });
      return;
    } else {
      res.json("Email já existe");
    }
  }
  res.json({ error: "Email e/ou senha não enviado!" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "24h" }
      );
      res.json({ status: true, token, user });
      return;
    } else {
      res.json({ message: "Incorrect password", status: false });
    }
  } else {
    res.json({ message: "User not found", status: false });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  const token = req.body.token;

  try {
    const data = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
    res.json({ user: data });
  } catch (error) {
    res.json(error);
  }
};
