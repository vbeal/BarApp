import { Router } from "express";
import multer from "multer";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";


import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItensController } from "./controllers/order/AddIntensController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderService } from "./services/order/SendOrderService";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";




const routes = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS USER --
routes.post("/users", new CreateUserController().handle);

routes.post("/session", new AuthUserController().handle);

routes.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
routes.post("/category", isAuthenticated, new CreateCategoryController().handle);
routes.get("/category", isAuthenticated, new ListCategoryController().handle);


// -- ROTAS PRODUCT --
routes.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
routes.get("/category/product", isAuthenticated, new ListByCategoryController().handle);

// -- ROTAS ORDER --
routes.post("/order", isAuthenticated, new CreateOrderController().handle);
routes.delete("/order", isAuthenticated, new RemoveOrderController().handle);

// -- ROTAS ADD ITENS --
routes.post("/order/add", isAuthenticated, new AddItensController().handle);
routes.delete("/order/itemremove", isAuthenticated, new RemoveItemController().handle);
routes.put("/order/send", isAuthenticated, new SendOrderController().handle);
routes.get("/orders", isAuthenticated, new ListOrdersController().handle);
routes.get("/order/detail", isAuthenticated, new DetailOrderController().handle);
routes.put("/order/finish", isAuthenticated, new FinishOrderController().handle);

export { routes };
