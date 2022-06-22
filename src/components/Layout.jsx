import React from "react";

import { CustomHeader } from "./Header";

const Layout = (props) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <CustomHeader onKeyDown={props.onKeyDown} />
      <div className="h-full w-full">{props.children}</div>
    </div>
  );
};

export { Layout };
