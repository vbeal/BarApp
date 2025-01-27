import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({name, price, description, banner, category_id}: ProductRequest){


        if (name ===''){
            throw new Error("Incorrect name!");
        
        }

        // Vamos verificar se o produto já existe
        const productAlreadyExists = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        })

        if (productAlreadyExists) {
            throw new Error("Product already exists");
        }
       

                const product = await prismaClient.product.create({
                    data: {
                        name,
                        price,
                        description,
                        banner,
                        category_id
                    },
                    select: {
                        id: true,
                        name: true
                    }
                })
                    
                        return {
                            name,
                            price,
                            description,
                            banner,
                            category_id
                        };

            
    }
}

export { CreateProductService }