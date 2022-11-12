import { Schema, model, ObjectId } from "mongoose";
import { IAccount } from "../app/interfaces/models/IAccount";

const AccountSchema = new Schema<IAccount>(
  {
    account: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Account", AccountSchema);
