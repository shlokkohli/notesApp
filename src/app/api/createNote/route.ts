import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import NotesModel, { INote } from "@/models/Notes";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse.types";
import { Note } from "@/types/notes.types";
import { ErrorResponse } from "@/types/ErrorResponse.types";

export async function POST(request : Request){

    const session = await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json<ErrorResponse>(
            {
                success: false,
                message: "Try logging in again"
            },
            { status : 401 }
        )
    }

    await connectDB();

    try {

        const { title, content } = await request.json();

        // if both title and content are missing throw error
        if(!title && !content){
            return NextResponse.json<ErrorResponse>({
                success: false,
                message: "Either title or content is required"
            },
            { status : 400 })
        }

        // first find the user in the db from the _id in the token
        const user = await UserModel.findById(session.user._id)

        if(!user){
            return NextResponse.json<ErrorResponse>({
                success: false,
                message: "User not found"
            },
            { status : 404 })
        }

        // if the user is found save the note
        const note: INote = await NotesModel.create({
            title,
            content,
            userId : user._id
        })

        const response: ApiResponse<Note> = {
            success: true,
            message: "Note saved succesfully",
            data: {
                _id: note._id.toString(),
                title: note?.title,
                content: note?.content,
                userId: note.userId.toString()
            }
        }

        return NextResponse.json(response, { status : 201 })
        
    } catch (error) {

        console.log("Error saving note", error);
        return NextResponse.json<ErrorResponse>({
            success: false,
            message: "Error saving note",
        }, {status: 500 })
        
    }

}