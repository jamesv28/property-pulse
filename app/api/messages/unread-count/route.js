import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUsers";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const sessionsUser = await getSessionUser();
    if (!sessionsUser || !sessionsUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }

    const { userId } = sessionsUser;

    const unreadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessageCount }), {
      status: 200,
    });
  } catch (err) {
    console.log("Error: ", err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
