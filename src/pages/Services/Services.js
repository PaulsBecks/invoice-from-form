import React from "react";
import useServices from "../../hooks/useServices";

export default function Services() {
  const [services] = useServices();
  console.log(services);
  return <div></div>;
}
