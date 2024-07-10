import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUsers";

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("User id is required", {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const user = await User.findOne({ _id: userId });

    // check if bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId)
      message = 'Bookmark successfully removed';
      isBookmarked = false
    }
    else {
        user.bookmarks.push(propertyId)
        message = 'Bookmark successfully added'
        isBookmarked = true

    }

    await user.save()
    return new Response(JSON.stringify({ message, isBookmarked}), {status: 200}),                                                  )
  } catch (err) {
    return new Response('Something went wrong', {
        status: 500
    })
  }
};
