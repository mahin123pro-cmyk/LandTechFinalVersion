import {z} from "zod";

export const registerZodSchema=z.object({
    username:z.string().min(5,"Name must be 5 character"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(5,"Password must be 5 character")
})