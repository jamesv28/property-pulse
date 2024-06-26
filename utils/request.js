// fetch all properties
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  try {
    if (!apiDomain) return [];
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Error happened fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    return [];
  }
}

// fetch single property
async function fetchProperty(id) {
  try {
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/properties/${[id]}`);
    if (!res.ok) {
      throw new Error("Error happened fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    return null;
  }
}

export { fetchProperties, fetchProperty };
