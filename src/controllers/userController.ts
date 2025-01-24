import { Request, Response, NextFunction } from 'express';

import User from '../models/userModels';

import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register a user
//@route GET api/users/register
//@access private

const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body as UserRequestBody;

    if (!email || !username || !password) {
      res.status(404);
      throw new Error('All fields are mandatory');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(403);
      throw new Error('Email already exist.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Registration succesful.',
      data: { id: newUser._id, email: newUser.email },
    });
  }
);
//@desc Login a user
//@route GET api/users/register
//@access public

const loginUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as UserRequestBody;

    if (!email || !password) {
      res.status(404);
      throw new Error('All fields are mandatory');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(403);
      throw new Error('No user was found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(404);
      throw new Error('Email or password is wrong.');
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      message: 'Login succesful.',
      accessToken,
    });
  }
);
//@desc Get user info
//@route GET api/users/register
//@access public

const currentUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
  }
);

export { loginUser, registerUser, currentUser };
