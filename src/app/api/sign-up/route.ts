import connectDB from "@/lib/connectDB";
import UserModel, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse.types";
import { User } from "@/types/user.types";
import { ErrorResponse } from "@/types/ErrorResponse.types";

export async function POST(request : Request) {

    await connectDB();

    try {

        const { name, email, password } = await request.json();

        // check if the user already exists
        const existingUser = await UserModel.findOne({ email });

        // if the user already exists, throw error
        if(existingUser){
            return NextResponse.json<ErrorResponse>({
                success: false,
                message: "Email already exists"
            },
            { status: 400 });
        }

        // now if the user does not exist

        // first hash the user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // now create the current user
        const user: IUser = await UserModel.create({
            name,
            email,
            password : hashedPassword
        })

        const response: ApiResponse<User> = {
            success: true,
            message: "User created successfully",
            data: {
                _id: user._id.toString(),
                name: user.name,
                email : user.email
            }
        }

        return NextResponse.json(response, { status : 201 })
        
    } catch (error) {

        console.log("SignUp error ", error);
        return NextResponse.json<ErrorResponse>({
            success: false,
            message: "Error registering user"
        }, { status : 500 })
        
    }

}