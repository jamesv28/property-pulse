import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h3 className="text-3xl mx-4">Welcome</h3>
      <Link href="/properties">Property List</Link>
    </div>
  );
};

export default HomePage;
