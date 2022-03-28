import { Schema, model, ObjectId} from "mongoose";

type CategoryType = {
   category: string,
   userId: ObjectId
}

const CategorySchema = new Schema<CategoryType>({
    category: {
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

export default model("Category", CategorySchema);