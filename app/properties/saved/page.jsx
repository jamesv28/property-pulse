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
        console.log(properties);
      }
    };
    fetchSavedProeprties();
  }, []);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl shadow-md relative">
            {/* <!-- Remove button --> */}
            <button className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100">
              <i className="fas fa-trash text-red-600"></i>
            </button>
            <img
              src="images/properties/a1.jpg"
              alt=""
              className="object-cover rounded-t-xl"
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">Apartment</div>
                <h3 className="text-xl font-bold">Boston Commons Retreat</h3>
              </div>
              <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                $4,200/mo
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-bed"></i> 3
                  <span className="md:hidden lg:inline">Beds</span>
                </p>
                <p>
                  <i className="fa-solid fa-bath"></i> 2
                  <span className="md:hidden lg:inline">Baths</span>
                </p>
                <p>
                  <i className="fa-solid fa-ruler-combined"></i>
                  1,500 <span className="md:hidden lg:inline">sqft</span>
                </p>
              </div>

              <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                <p>
                  <i className="fa-solid fa-money-bill"></i> Weekly
                </p>
                <p>
                  <i className="fa-solid fa-money-bill"></i> Monthly
                </p>
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
                  <span className="text-orange-700"> Boston MA </span>
                </div>
                <a
                  href="property.html"
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
