import { Schema, model } from "mongoose";
import { ICategory } from "../app/interfaces/models/ICategory";

const CategorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        type: String,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);
