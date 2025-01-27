import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {
       
        const listCategoryService = new ListCategoryService(); //Instanciando o Service

        const category = await listCategoryService.execute(); //Executando o Service  
        return res.json(category);
    }
}   

export { ListCategoryController };