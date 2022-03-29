import { Schema, model, ObjectId} from "mongoose";

type TransactionType = {
   transactionType: boolean,
   transactionDescription: string,
   transactionValue: number,
   transactionDate: string,
   transactionPaymentDate: string,
   transactionStatus: boolean,
   transactionCategory: string,
   transactionAccount: string,
   userId: ObjectId
}

const transactionSchema = new Schema<TransactionType>({
    transactionType: {
        type: Boolean, 
        required: true
    },
    transactionDescription: {
        type: String, 
        required: true
    },
    transactionValue: {
        type: Number, 
        required: true
    },
    transactionDate:{
        type: String, 
        required: true
    },
    transactionPaymentDate: {
        type: String,
    },
    transactionStatus:{
        type: Boolean,
        required: true
    },
    transactionCategory:{
        type: String,
        required: true
    },
    transactionAccount:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps: true});

export default model("Transaction", transactionSchema);