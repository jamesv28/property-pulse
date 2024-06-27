import React from "react";
import PropertyCard from "@/components/PropertyCard";

async function fetchRequests() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
    console.log("response", res);
    if (!res.ok) {
      throw new Error("Error happened fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(`Error occurred: ${err}`);
  }
}
const PropertiesPage = async () => {
  const properties = await fetchRequests();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
