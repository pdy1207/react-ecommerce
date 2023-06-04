import { React, useEffect } from "react";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import classNames from "classnames";
import styled from "styled-components";

export default function Home() {
  const store = homeStore();

  useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
  }, []);

  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
    }
  }, []);

  const darkOnOff = () => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("ui-dark")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("ui-dark");
      window.localStorage.setItem("bgMode", "light");
    } else {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
      window.localStorage.setItem("bgMode", "dark");
    }
  };

  return (
    <Background>
      <div>
        <Header />
        <div className="background">dark mode</div>
        <button onClick={darkOnOff}>on/off darkMode</button>

        <header className="home-search">
          <div className="width">
            <h2>Search for a coin</h2>
            <div
              className={classNames("home-search-input", {
                searching: store.searching,
              })}
            >
              <input
                type="text"
                value={store.query}
                onChange={store.setQuery}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="20"
              >
                <path
                  fill="currentColor"
                  d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                />
              </svg>
            </div>
          </div>
        </header>
        <div className="home-cryptos">
          <div className="width">
            <h2> {store.searched ? "Search results" : "Trending coins"}</h2>
            <div className="home-cryptos-list">
              {store.coins.map((coin) => {
                return <ListItem key={coin.id} coin={coin} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
const Background = styled.div`
  background-color: var(--background-color);
  color: var(--primary-color);
  transition: ease-in-out 0.5s;
`;
