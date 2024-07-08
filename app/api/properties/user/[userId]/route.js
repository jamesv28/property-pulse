import connectDB from "@/config/database";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUsers";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;
    if (!userId) {
      return new Response("User ID is required", {
        status: 400,
      });
    }

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    return new Response(`Something went wrong: ${err}`, { status: 500 });
  }
};
