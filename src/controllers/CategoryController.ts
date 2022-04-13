import {Request, Response} from 'express';
import Category from '../models/categoryModel';

export const create = async (req: Request, res: Response) => {
    try {   
        const newCategory = await Category.create({category: req.body.title, userId: req.userId});
        res.json(newCategory)
    } catch (error) {
        res.json({error})
    }
};

export const createSubCat = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const subCat =  req.body.subCat

        const newSubCat = await Category.updateOne(
            {_id: id},
            {$push: { subCategory: subCat } }       
        )
        res.json(newSubCat)
    }catch (error){
        res.json(error)
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try{ 
        const list = await Category.find({userId: req.userId})
        res.json(list);
    }catch (error){
        res.status(403).json({error})
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try { 
        const id: string = req.params.id;     
        const title = req.body.title;
        if(title){
            const update = await Category.updateOne(
                {_id: id},
                {category: title}
            )
            res.json({update})
        }else{
            res.json({error: 'Não recebemos o título a ser atualizado!'})
        }
        
    } catch (error) {
        res.status(404)
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if(id){
            const del = await Category.deleteOne({_id:id});
            res.status(200).json({message:'deleted'})
        }else{
            res.json({error: 'conta não encontrada!'})
        }

    } catch (error) {
        res.json({error})
    }
};

export const getCategoryId = async (req: Request, res: Response) => {
    try{
        const category = await Category.findById({_id: req.params.id});
        res.json(category)
    }catch(error){
        res.json({error})
    }
}
