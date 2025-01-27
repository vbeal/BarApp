import {Request, Response} from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(req: Request, res: Response) {
        
        const category_id = req.query.category_id as string; 

        const listByCategory = new ListByCategoryService(); //Instanciando o Service

        const products = await listByCategory.execute({
            category_id
        });

        return res.json(products);

    }
}

export { ListByCategoryController };