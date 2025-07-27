import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";
import NotesModel from "@/models/Notes";

export async function GET(){

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json(
            { message : "Unauthorized" },
            { status : 401 }
        )
    }

    await connectDB();

    try {

        const user = await UserModel.findById(session.user._id);

        if(!user){
            return NextResponse.json(
                { message : "User not found" },
                { status : 404 }
            )
        }

        // if the user is found, find its notes
        const notes = await NotesModel.find({ userId : user._id })
        .sort({ createdAt : -1 })
        .select("title content")

        return NextResponse.json(
            { notes },
            { status : 200 }
        )
        
    } catch (error) {

        console.log("Failed to fetch notes", error);
        return NextResponse.json(
            { message : "Failed to fetch notes" },
            { status : 500 }
        )
        
    }

}