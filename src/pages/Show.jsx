import React from "react";
import showStore from "../stores/showStroe";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";
import { FaAdjust } from "react-icons/fa";
import styled from "styled-components";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);

    return () => {
      store.reset();
    };
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
      <Header back />
      <ToggleButton onClick={darkOnOff}>
        <FaAdjust size={24} />
      </ToggleButton>
      {store.data && (
        <>
          <header className="show-header">
            <img src={store.data.image.large} />
            <h2 className="show-title">
              {store.data.name} ({store.data.symbol})
            </h2>
          </header>
          <div className="width">
            <div className="show-graph">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={store.graphData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Price"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <table class="container">
            <thead>
              <tr>
                <th>
                  <h2>DETAILS</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>시가총액 순위</td>
                <td>{store.data.market_cap_rank} 🪂</td>
              </tr>
              <tr>
                <td>24시간 최고가</td>
                <td>{store.data.market_data.low_24h.usd} 📈</td>
              </tr>
              <tr>
                <td>24시간 최저가</td>
                <td>{store.data.market_data.low_24h.usd} 📉</td>
              </tr>
              <tr>
                <td>순환 공급</td>
                <td>
                  {store.data.market_data.circulating_supply}
                  📊
                </td>
              </tr>
              <tr>
                <td>현재 가격</td>
                <td>{store.data.market_data.current_price.usd} 💰</td>
              </tr>
              <tr>
                <td>1년 변동</td>
                <td>
                  {store.data.market_data.price_change_percentage_1y.toFixed(2)}
                  📈
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Background>

    // 시가 총액 순위 24시간
    // 24시간 최저
    // 현재 가격
    // 1년 변동
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
