import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import NotesModel from "@/models/Notes";
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

        const { title, content } = await request.json();

        // if both title and content are missing throw error
        if(!title && !content){
            return NextResponse.json(
                { message : "Title or content is required" },
                { status : 400 }
            )
        }

        // first find the user in the db from the _id in the token
        const user = await UserModel.findById(session.user._id)

        if(!user){
            return NextResponse.json(
                { message : "User not found" },
                { status : 404 }
            )
        }

        // if the user is found save the note
        const note = await NotesModel.create({
            title,
            content,
            userId : user._id
        })

        return NextResponse.json(
            {
                message : "Note saved successfully",
                note : {
                    _id : note._id,
                    title : note?.title,
                    content : note?.content,
                    userId : note.userId
                }
            },
            { status : 201 }

        )
        
    } catch (error) {

        console.log("Error saving note", error);
        return NextResponse.json(
            { message : "Error saving note" },
            { status : 500 }
        )
        
    }

}