import { ObjectId } from "mongoose";

export interface ITransaction {
  transactionType: string;
  transactionDescription: string;
  transactionValue: number;
  transactionDate: string;
  transactionPaymentDate: string;
  transactionStatus: boolean;
  transactionCategory: string;
  transactionAccount: string;
  transactionAccountDestination: string;
  userId: ObjectId;
}
