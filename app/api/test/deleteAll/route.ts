import connectMongoDB from "@/lib/dbConnection";
import Todo from "@/models/todoModel";

export async function POST() {
    await connectMongoDB();
    try {
        await Todo.deleteMany();
        return Response.json("success", { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
