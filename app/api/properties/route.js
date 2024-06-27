import connectDB from "@/config/database";
import Property from "@/models/property";

export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    return new Response(`Something went wrong: ${err}`, { status: 500 });
  }
};
