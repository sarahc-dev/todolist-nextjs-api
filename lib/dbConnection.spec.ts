import connectMongoDb from "./dbConnection";
import mongoose from "mongoose";

jest.mock("mongoose");

describe("Database URL configuration", () => {
    it("should connect to the test database when NODE_ENV='development'", async () => {
        await connectMongoDb();
        expect(mongoose.connect).toBeCalledWith("mongodb://0.0.0.0/todolist-test");
    });

    it("should connect to the todolist database when NODE_ENV='production", async () => {
        process.env.NODE_ENV = "production";
        await connectMongoDb();
        expect(mongoose.connect).toBeCalledWith("mongodb://0.0.0.0/todolist");
    });

    it("should handle a failed database connection", async () => {
        mongoose.connect = jest.fn().mockRejectedValue(new Error("Connection failed"));

        // Prevents error being printed to console during test
        console.error = jest.fn();

        await connectMongoDb();
        await expect(mongoose.connect).rejects.toThrowError("Connection failed");
    });
});
