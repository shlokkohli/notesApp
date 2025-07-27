import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";

export async function POST(request : Request){

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json(
            { message : "Unauthorized" },
            { status : 401 }
        )
    }

    await connectDB();

    try {

        const { newName } = await request.json();

        // first find the user whose name needs to be changed
        const user = await UserModel.findById(session.user._id);

        if(!user){
            return NextResponse.json(
                { message : "User not found" },
                { status : 404 }
            )
        }

        // now if user is found, change the name
        const updatedName = await UserModel.findByIdAndUpdate(
            user._id,
            { name : newName}
        )

        return NextResponse.json(
            { message : "Name updated successfully" },
            { status : 200 }
        )
        
    } catch (error) {

        console.log("Error updating name");
        return NextResponse.json(
            { message : "error updating name" },
            { status : 500 }
        )
        
    }

}