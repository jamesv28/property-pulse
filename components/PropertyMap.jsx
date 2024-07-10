"use client";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [geoCodeError, setGeocodeError] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //  Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (geoCodeError) return <div className="text-xl">No location found</div>;

  if (loading) return <Spinner loading={loading} />;
  return (
    !loading && (
      <Map
        mapboxAccessToken="pk.eyJ1IjoianZvbG1lcnQyOSIsImEiOiJjbHllejl3b2owMmdqMmxwcjI1YnNncHJ4In0.m8pxXIUFzhMeFJ4MReMzuQ"
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={long} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
