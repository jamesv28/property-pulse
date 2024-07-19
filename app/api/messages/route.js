import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUsers";

export const dynamic = "force-dynamic";

// post request /api/message
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();
    const sessionsUser = await getSessionUser();
    if (!sessionsUser || !sessionsUser.user) {
      return new Response("You must be logged in to send a message", {
        status: 401,
      });
    }
    const { user } = sessionsUser;

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({
          message: "Can not send a message to yourself",
        }),
        {
          status: 400,
        }
      );
    }
    const newMessage = new Message({
      name,
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });
    await newMessage.save();
    return new Response(
      JSON.stringify({
        message: "Sent",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err,
      }),
      {
        status: 500,
      }
    );
  }
};
