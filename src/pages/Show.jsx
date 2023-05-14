import React from "react";
import showStore from "../stores/showStroe";
import { useParams } from "react-router-dom";
import { PureComponent } from "react";
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

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    console.log(params);
    store.fetchData(params.id);
  }, []);

  if (!store.data) return <></>; // 데이터 없을 시 빈화면만

  return (
    <div>
      <Header back />
      <header>
        <img src={store.data.image.large} />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
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
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <div>
        <h4>Market cap rank</h4>
        <span>{store.data.market_cap_rank}</span>
      </div>
      <div>
        <h4>24h high</h4>
        <span>{store.data.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>24h low</h4>
        <span>{store.data.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>Circulating Supply</h4>
        <span>{store.data.market_data.circulating_supply}</span>
      </div>
      <div>
        <h4>Current price</h4>
        <span>{store.data.market_data.current_price.usd}</span>
      </div>
      <div>
        <h4>1y change</h4>
        <span>
          {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
        </span>
      </div>
    </div>
    // 시가 총액 순위 24시간
    // 24시간 최저
    // 현재 가격
    // 1년 변동
  );
}
