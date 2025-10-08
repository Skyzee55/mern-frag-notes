import mongoose, { connect } from "mongoose";


const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName : "notes_database"
        })
        console.log(`Success Connect Database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Failed Connect Database ${error}`)
    }
}

export default connectDB