import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUsers";

export const dynamic = "force-dynamic";

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const sessionsUser = await getSessionUser();
    if (!sessionsUser || !sessionsUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { userId } = sessionsUser;

    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message not found", {
        status: 404,
      });
    }
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (err) {
    console.log("Error: ", err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
