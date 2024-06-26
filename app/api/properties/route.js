import connectDB from "@/config/database";
export const GET = async (request) => {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(`Something went wrong: ${err}`, { status: 500 });
  }
};
