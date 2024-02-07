import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { DateTime } from 'luxon';
import {Model} from 'mongoose';
import Game, { GameInterface, Coordinates } from '../models/game';
const GameModel = Game as Model<GameInterface>;
const secretKey: string = process.env.SECRET_KEY as string;


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
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    // Extract the JWT token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Split "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the JWT token
      interface Decoded {
        date: string;
      }

      const decoded = jwt.verify(token, secretKey || '') as Decoded;

      const decodedDate = DateTime.fromISO(decoded.date);
      const currentDate = DateTime.now();

      // Calculate the difference between the two dates
      const diffInMilliseconds = currentDate
        .diff(decodedDate)
        .as('milliseconds');


      const game = req.headers.game;
      const gameDocument = await GameModel.findOne({
        number: parseInt(game as string),
      });

      if (!gameDocument) {
        return res.status(404).json({ message: 'Game not found' });
      }

      // Extract the coordinates from the game document
      const coordinates: Coordinates = gameDocument.coordinates;

      // Prepare the response object
      const response = {
        coordinates,
        record: diffInMilliseconds,
      };

      // Send the response
      res.json(response);
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Failed to verify token' });
    }
  }
);
