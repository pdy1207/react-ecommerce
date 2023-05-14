import axios from "axios";
import { create } from "zustand";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
  coins: [], // 검색기능
  trending: [], // 되돌아가기
  query: "",

  // 검색기능
  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, trending } = homeStore.getState();

    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });

      set({ coins });
      console.log(res.data);
    } else {
      set({ coins: trending });
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      ),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;
    console.log(btcPrice);

    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc.toFixed(10),
        // coin api 가져오기
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
        // 소수점 10자리까지만 ,
      };
    });

    console.log(coins);
    set({ coins, trending: coins });
    // console.log(coins);
  },
}));

export default homeStore;
