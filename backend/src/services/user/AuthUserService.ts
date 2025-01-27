import e from "express";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect");
        }

        //verificar se a senha está correta com bcrypt
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/Password incorrect");
        }

        // Gerar token JWT e devolver ao usuário com Id, Nome e Email
        const token = sign(
            {
            name: user.name,
            email: user.email
        },

        //Chave secreta está no .env
        process.env.JWT_SECRET,
        {
            subject: user.id, //Id do usuário
            expiresIn: "30d" //Expira em 30 dias
        }
        )
        //Retornar o token e as informações do usuário
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
        
    }    
}   

export { AuthUserService }