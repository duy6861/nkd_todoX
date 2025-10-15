import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(
            process.env.MONGODB_CONNECTIONSTRING
            
        )
        console.log("connect db thanh cong" )
    }
    catch(err){
        console.log("connect db that bai", err)
        process.exit(1) // thoat khoi ung dung
    }
}