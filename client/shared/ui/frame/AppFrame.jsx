import React from "react";

const AppFrame = ({ children, shouldHideAppBar }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
};

export default AppFrame;
