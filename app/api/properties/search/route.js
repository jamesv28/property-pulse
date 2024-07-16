import connectDB from "@/config/database";
import Property from "@/models/property";

// api/properties/search

export const Get = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");
    console.log("location", location);

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("err", err);
    return new Response(
      JSON.stringify({
        message: "failure",
      }),
      {
        status: 500,
      }
    );
  }
};
