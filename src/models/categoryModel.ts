import { Schema, model, ObjectId} from "mongoose";

type CategoryType = {
   category: [string],
   transactionId: ObjectId
}

const CategorySchema = new Schema<CategoryType>({
    category: [{
        type: String,
        required: true,
        default: 'outros'
    }],
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }

},
    {timestamps: true});

export default model("Category", CategorySchema);