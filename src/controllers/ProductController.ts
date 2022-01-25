import {Request, Response} from 'express';
import productModel from '../models/productModel';

export const create = async (req: Request, res: Response)=>{
    const { title, price, description, category, size} = req.body;
    const images = req.files

    const newProduct = await productModel.create({
        title: ProductTitle, 
        price: ProductPrice, 
        description: ProductDescription, 
        category: ProductCategory, 
        size: ProductSize, 
        ProductImage: images})
}

export const uploadFiles = async (req: Request, res: Response)=>{
    console.log(req.files);

    res.json({})
}