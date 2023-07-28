import React, { useEffect } from "react";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import classNames from "classnames";
import styled from "styled-components";
import { FaAdjust } from "react-icons/fa";

export default function Home() {
  const store = homeStore();

  useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
  }, []);

  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
    } else {
      document.getElementsByTagName("html")[0].classList.remove("ui-dark");
    }
  }, []);

  const darkOnOff = () => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
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
        <ToggleButton onClick={darkOnOff}>
          <FaAdjust size={24} />
        </ToggleButton>

        <header className="home-search">
          <div className="width">
            <InputLabelWrapper className="home-search-input">
              <input
                type="text"
                id="inp"
                value={store.query}
                onChange={store.setQuery}
                placeholder="&nbsp;"
              />
              <span className="label">
                <p>금일 주식 상한선을 검색해주세요 ●'◡'●</p>
              </span>
              <span className="focus-bg"></span>
            </InputLabelWrapper>
          </div>
        </header>
        <div className="home-cryptos">
          <div className="width width-styleing">
            <h2> {store.searched ? "Search results" : "TITLE"}</h2>
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

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--primary-color);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const InputLabelWrapper = styled.label`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  border-radius: 3px;
  overflow: hidden;

  .label {
    position: relative;
    top: 20px;
    font-size: 21px;
    font-weight: 500;
    transform-origin: 0px 0px;
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.2s ease 0s;
    pointer-events: none;
  }

  .focus-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    border: 0;
    font-family: inherit;
    padding: 16px 12px 0 12px;
    height: 56px;
    font-size: 16px;
    font-weight: 400;
    background: rgba(0, 0, 0, 0.02);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    color: #000;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
      box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5);
    }

    &:not(:placeholder-shown) + .label {
      color: rgba(0, 0, 0, 0.5);
      transform: translate3d(0, -12px, 0) scale(0.75);
    }

    &:focus {
      background: rgba(0, 0, 0, 0.05);
      outline: none;
      box-shadow: inset 0 -2px 0 #0077ff;
    }

    &:focus + .label {
      color: #0077ff;
      transform: translate3d(0, -12px, 0) scale(0.75);
    }

    &:focus + .label + .focus-bg {
      transform: scaleX(1);
      transition: all 0.1s ease;
    }
  }
`;
