import React from "react";
import Header from "./Header";
import Routes from "./Routes";

/**
 * Defines the main layout of the application.
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="main">
        <Routes />
      </div>
    </div>
  );
}

export default Layout;
