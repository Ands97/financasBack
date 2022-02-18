import { Schema, model, ObjectId} from "mongoose";

type TransactionType = {
   transactionType: string,
   transactionDescription: string,
   transactionValue: number,
   transactionDay: string,
   transactionMonth: string,
   transactionYear: string,
   transactionStatus: boolean,
   transactionCategory: [ObjectId],
   transactionAccount: [ObjectId],
   userId: ObjectId
}

const transactionSchema = new Schema<TransactionType>({
    transactionType: {
        type: String, 
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
    transactionDay:{
        type: String, 
        required: true
    },
    transactionMonth:{
        type: String, 
        required: true
    },
    transactionYear:{
        type: String, 
        required: true
    },
    transactionStatus:{
        type: Boolean,
        required: true
    },
    transactionCategory:[{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    transactionAccount:[{
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }],
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps: true});

export default model("Transaction", transactionSchema);