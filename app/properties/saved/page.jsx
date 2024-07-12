"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProeprties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status == 200) {
          const data = await res.json();
          setProperties(data);
          setLoading(false);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (err) {
        toast.error("Something went wrong:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProeprties();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Saved Properties</p>
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

export default SavedPropertiesPage;
