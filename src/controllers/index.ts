import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const secretKey:string = process.env.SECRET_KEY as string;

export const get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json('main page');
  }
);

export const start = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
   try {
     // Create a new date
     const currentDate = new Date();

     // Create a JWT containing the date (you can include additional data if needed)
     const token = jwt.sign({ date: currentDate }, secretKey);

     // Send the JWT as a response
     res.json({ token });
   } catch (error) {
     console.error('Error generating token:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
  }
);


export const stop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json('main page');
  }
);