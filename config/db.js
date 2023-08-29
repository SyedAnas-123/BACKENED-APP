import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://admin-2:12345@1-cluster-anas.k3pwr0x.mongodb.net/E-commerce-2')
        console.log(`Connected to MongoDB DataBase ${conn.connection.host}`.bgMagenta.white)

    } catch (error) {
        console.log(`ERROR IN MONGO DB ${error}`.bgRed.black)

    }
}

export default connectDB;