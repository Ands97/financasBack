import { Schema, model, ObjectId} from "mongoose";

type AccountType = {
   account: [string],
   transactionId: ObjectId
}

const AccountSchema = new Schema<AccountType>({
    account: [{
        type: String,
        required: true,
        default: 'carteira'
    }],
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }

},
    {timestamps: true});

export default model("Account", AccountSchema);