import mongoose from "mongoose";

async function connectDB() : Promise<void> {

    if(mongoose.connection.readyState >= 1){
        console.log("Database already connected");
        return;
    }

    try {
        
        // first make a database connection
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("DB connected successfully");

    } catch (error) {

        console.log("Database connection failed", error);
        process.exit(1);
        
    }

}

export default connectDB;