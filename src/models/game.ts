import mongoose, { Document, Schema } from 'mongoose';

export interface Coordinates {
  x: number;
  y: number;
}

 export interface Record {
  name: string;
  record: number;
}

export interface GameInterface extends Document {
  number: Number;
  coordinates: Coordinates;
  records: Record[];
}

const GameSchema = new Schema<GameInterface>({
  number: { type: Number, required: true },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  records: [
    {
      name: { type: String, required: true },
      record: { type: Number, required: true },
    },
  ],
});

const GameModel = mongoose.model<GameInterface>('Game', GameSchema);
export default GameModel;