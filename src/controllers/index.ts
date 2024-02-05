import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json('sraka');
  }
);
