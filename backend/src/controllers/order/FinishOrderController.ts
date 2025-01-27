import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const sendOrder = new FinishOrderService()

        const order = await sendOrder.execute({
            id
        });

        return res.json(order)
    }
}

export { FinishOrderController }