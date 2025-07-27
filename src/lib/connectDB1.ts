import mongoose from "mongoose";


interface connectionObject {
    isConnected? : number
}

// when there is no connetion initially, it will be empty
const connection : connectionObject = {};


// void function return type means the function's output does not contain an explicit "return" keyword
async function alternateDB(): Promise<void> {

    // first i need to check if the user is already connected, because in dev mode, this function might run again and again
    if(connection.isConnected === 1){
        console.log("Database is already connected");
        return;
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI as string)

        connection.isConnected = db.connection.readyState;
        console.log("DB connected successfully");

        // the readystate contains 0, 1, 2 and 3
        // 0 -> disconnected    1 -> connected   2 -> connecting    3 -> disconnecting
        // we need 1

    } catch (error) {

        console.log("Database connection failed", error);
        process.exit(1)

    }

}

export default alternateDB;