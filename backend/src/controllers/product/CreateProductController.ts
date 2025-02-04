import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        

        const createProductService = new CreateProductService();

        if(!req.file) {
            throw new Error("File not found!");
        
        }else{
            const { originalname, filename } = req.file;

            console.log(filename);

            const product = await createProductService.execute({
            name, 
            price, 
            description, 
            banner: filename, 
            category_id
        }); //Executando o Service

        return res.json(product);
        }

        
    }
}

export { CreateProductController };