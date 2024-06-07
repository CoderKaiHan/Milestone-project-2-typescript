import 'dotenv/config'
import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)
        console.log('MongoDB connection successful!')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB

// to seed: node src/server/seeders/seed-itineraries.js