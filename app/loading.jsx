"use client";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
// mongodb+srv://jvolmert29:james123@propertypulse.fetivjg.mongodb.net/?retryWrites=true&w=majority&appName=PropertyPulse
const override = {
  display: "block",
  margin: "250px auto",
};

const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
