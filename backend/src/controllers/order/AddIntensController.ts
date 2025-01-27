import { Request, Response } from "express";
import { AddItensService } from "../../services/order/AddItensService";



class AddItensController {
    async handle(request: Request, response: Response) {
        const { order_id, product_id, amount } = request.body;

        const addItensService = new AddItensService;

        const order = await addItensService.execute({
            order_id,
            product_id,
            amount
        });

        return response.json(order);
    }
}

export { AddItensController };