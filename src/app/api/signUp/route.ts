import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request : Request) {

    await connectDB();

    try {

        const { name, email, password } = await request.json();

        // check if the user already exists
        const existingUser = await UserModel.findOne({ email });

        // if the user already exists, throw error
        if(existingUser){
            return NextResponse.json(
                { message : "User already exists" },
                { status : 400 }
            )
        }

        // now if the user does not exist

        // first hash the user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // now create the current user
        const user = await UserModel.create({
            name,
            email,
            password : hashedPassword
        })

        return NextResponse.json(
            { message : "User created successfully ",
              user : {
                _id : user._id,
                name : user.name,
                email : user.email
              }
            },
            { status : 201 }
        )
        
    } catch (error) {

        console.log("SignUp error ", error);
        return NextResponse.json(
            { message : "Error registering user" },
            { status : 500 }
        )
        
    }

}