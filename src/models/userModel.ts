import { Schema, model, ObjectId } from "mongoose";

type UserType = {
    name: string,
    email: string,
    password: string,
}

const userSchema = new Schema<UserType>({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique:true},
    password: {
        type: String, 
        required: true},
}, 
    {timestamps: true})  

export default model<UserType>('User', userSchema);