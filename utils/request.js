const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  try {
    if (!apiDomain) return [];
    const res = await fetch(`${apiDomain}/properties`);
    console.log("response", res);
    if (!res.ok) {
      throw new Error("Error happened fetching data");
    }

    return res.json();
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    return [];
  }
}

export { fetchProperties };
