import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ back }) {
  let navigate = useNavigate();

  const [isHeaderSmall, setIsHeaderSmall] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Only set the header to small if it's not already in the small state
      if (!isHeaderSmall && window.scrollY > 10) {
        setIsHeaderSmall(true);
      }
    }

    // Call the handleScroll function once to set the initial state based on the scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeaderSmall]); // Include isHeaderSmall in the dependency array to avoid stale state

  return (
    <header className={`header ${isHeaderSmall ? "small" : ""}`}>
      <div className="width">
        <div className="wrapper-parallax">
          <button
            onClick={() => {
              navigate("/react-ecommerce/");
            }}
          >
            <h1 className={`header_logo ${isHeaderSmall ? "small" : ""}`}>
              StockMarket 💰{" "}
              <p className="header_logo--content">
                주식시장은 '적극적인 자에게서 참을성이 많은 자에게로' 돈이
                넘어가도록 설계되어 있다.
              </p>
            </h1>
          </button>
        </div>
      </div>
    </header>
  );
}
