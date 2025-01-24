import { Request, Response, NextFunction } from 'express';

import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    let authHeader =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string);

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decodedToken: any) => {
          if (err) {
            res.status(401);
            throw new Error('Not authorized');
          }
          req.user = decodedToken.user;
          next();
        }
      );
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized or token is missing');
    }
  }
);

export default validateToken;
