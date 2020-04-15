import React from "react";

const Page = ({ children, singleMode, id }) => {
  return (
    <div
      id={id}
      className="bg-white shadow-1 center"
      style={{ width: "210mm", height: singleMode ? "297mm" : "" }}
    >
      {children}
    </div>
  );
};

export default Page;
