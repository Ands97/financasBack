import { Schema, model, ObjectId} from "mongoose";

type AccountType = {
   account: string,
   userId: ObjectId
}

const AccountSchema = new Schema<AccountType>({
    account: {
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

export default model("Account", AccountSchema);