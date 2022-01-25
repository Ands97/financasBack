import { Schema, model, Mongoose, ObjectId } from "mongoose";
import { StringDecoder } from "string_decoder";

type ProductType = {
    ProductTitle: string,
    ProductPrice: number,
    ProductDescription: string,
    ProductQuantity: number,
    ProductCategory: string,
    ProductSize: string,
    ProductImage: string,
}

const productSchema = new Schema<ProductType>({
    ProductTitle: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true,
    },
    ProductDescription: {
        type: String
    },
    ProductQuantity:{
        type: Number,
        required: true
    },
    ProductCategory: {
        type: String
    },
    ProductSize: [{
        type: String
    }],
    ProductImage: {
        type: String
    },
});

export default model("Product", productSchema);