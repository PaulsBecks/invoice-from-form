import React from "react";

export default function formatDate(dateString) {
  let date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `${day < 10 ? "0" + day : day}.&#8202;${
          month < 10 ? "0" + month : month
        }.&#8202;${date.getFullYear()}`,
      }}
    />
  );
}
