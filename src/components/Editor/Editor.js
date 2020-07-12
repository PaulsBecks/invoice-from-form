import React, { useState } from "react";
import RichTextEditor from "react-rte";

import "./Editor.css";

export default function Editor(props) {
  const [active, setActive] = useState(false);
  return (
    <RichTextEditor
      className="billeroo-editor"
      {...props}
      onFocus={() => setActive(true)}
      onBlur={() => {
        if (props.onBlur && typeof props.onBlur === "function") {
          props.onBlur();
        }
        setActive(false);
      }}
      toolbarConfig={{
        display: active
          ? [
              "INLINE_STYLE_BUTTONS",
              "BLOCK_TYPE_BUTTONS",
              "LINK_BUTTONS",
              "BLOCK_TYPE_DROPDOWN",
              "HISTORY_BUTTONS",
            ]
          : [],
        INLINE_STYLE_BUTTONS: [
          { label: "Bold", style: "BOLD", className: "custom-css-class" },
          { label: "Italic", style: "ITALIC" },
          { label: "Underline", style: "UNDERLINE" },
        ],
        BLOCK_TYPE_DROPDOWN: [
          { label: "Normal", style: "unstyled" },
          { label: "Heading Large", style: "header-one" },
          { label: "Heading Medium", style: "header-two" },
          { label: "Heading Small", style: "header-three" },
        ],
        BLOCK_TYPE_BUTTONS: [
          { label: "UL", style: "unordered-list-item" },
          { label: "OL", style: "ordered-list-item" },
        ],
      }}
    />
  );
}
