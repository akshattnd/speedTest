import mongoose from "mongoose";
export const dbConnect = async () => {
    const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}mongodb@cluster0.lmwf6.mongodb.net/?retryWrites=true&appName=Cluster0`
    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
}
