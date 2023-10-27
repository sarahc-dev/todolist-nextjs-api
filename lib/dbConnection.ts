import mongoose from "mongoose";

export const getDbUrl = () => {
    let dbUrl = "mongodb://0.0.0.0/";
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        dbUrl += "todolist-test";
    } else {
        dbUrl += "todolist";
    }
    return dbUrl;
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(getDbUrl());
    } catch (error) {
        console.error(error);
    }
};

export default connectMongoDB;
