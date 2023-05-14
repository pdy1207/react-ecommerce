import axios from "axios";
import { create } from "zustand";

const showStore = create((set) => ({
  graphData: [],

  //market_chart api
  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("kr-us");
      return {
        Date: date,
        Price: p,
      };
    });

    console.log(dataRes);

    set({ graphData });
    set({ data: dataRes.data });
  },
}));

export default showStore;
