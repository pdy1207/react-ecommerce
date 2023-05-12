import axios from "axios";
import { create } from "zustand";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  query: "",

  // 검색기능
  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query } = homeStore.getState();
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );
    console.log(res);
  }, 500),

  fetchCoins: async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc,
        // coin api 가져오기
      };
    });

    set({ coins });
    // console.log(coins);
  },
}));

export default homeStore;
