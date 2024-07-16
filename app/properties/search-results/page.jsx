"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.log("Error occurred: ", err);
      } finally {
        setLoading(false);
        console.log(location, propertyType);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  return <div></div>;
};

export default SearchResultsPage;
