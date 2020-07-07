import React from "react";
import { useUser } from "../../hooks";
import Stats from "../Stats";
import LandingPage from "../Landing";

export default function Home() {
  const [user] = useUser();
  if (user && user.user && !user.user.placeholder) {
    return (
      <div className="invoice-app-container">
        <Stats />
      </div>
    );
  }
  return <LandingPage />;
}
