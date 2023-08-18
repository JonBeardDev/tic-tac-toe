import React from "react";
import "./Header.css";

/**
 * Displays the header jumbotron
 * @returns {JSX.Element}
 */
function Header() {
  const letters = ["T", "I", "C", "-", "T", "A", "C", "-", "T", "O", "E"];

  return (
    <header className="header">
      <div className="header-tiles">
        {letters.map((letter, index) => (
          <div className="header-tile" key={index}>
            {letter}
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
