import { ObjectId } from "mongoose";

export interface ICategory {
  category: string;
  subCategory: [string];
  userId: ObjectId;
}
