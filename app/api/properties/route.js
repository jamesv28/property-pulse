import connectDB from "@/config/database";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUsers";
import cloudinary from "@/config/cloudinary";

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

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const sessionUser = await getSessionUser();
    // console.log("session user", sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    // console.log("user id", userId);

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the propertyData object
      propertyData.images = uploadedImages;
    }
    // console.log("property data", propertyData);

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new Response(
    //   JSON.stringify({
    //     message: "Successful post",
    //   }),
    //   {
    //     status: 200,
    //   }
    // );
  } catch (err) {
    console.log(`process api key`, process.env.CLOUDINARY_API_KEY);
    return new Response(`Failed to load property: ${err}`, {
      status: 500,
    });
  }
};
