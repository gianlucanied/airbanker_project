<script>
export default {
  name: "AppAbout",
  data() {
    return {
      apiKey: "TUO_API_KEY",
      indices: {
        "S&P 500": "SPY",
        Nasdaq: "IXIC",
        "Dow Jones": "DJI",
        "FTSE 100": "FTSE",
        "Nikkei 225": "N225",
      },
      marketData: [],
    };
  },
  methods: {
    async fetchStockData(symbol) {
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries);
        const latestData = timeSeries[dates[0]]; // Dati di oggi
        const previousData = timeSeries[dates[1]]; // Dati di ieri
        const latestPrice = parseFloat(latestData["4. close"]);
        const previousPrice = parseFloat(previousData["4. close"]);
        const change = latestPrice - previousPrice;
        const percentageChange = ((change / previousPrice) * 100).toFixed(2);

        return {
          symbol: symbol,
          price: latestPrice.toFixed(2),
          change: change.toFixed(2),
          percentageChange: percentageChange,
        };
      } catch (error) {
        console.error(`Errore nella chiamata API per ${symbol}:`, error);
        return null;
      }
    },
    async updateMarketData() {
      this.marketData = []; // Reset dei dati
      for (const [index, symbol] of Object.entries(this.indices)) {
        const data = await this.fetchStockData(symbol);
        if (data) {
          this.marketData.push({
            indexName: index,
            ...data,
          });
        }
      }
    },
  },
  mounted() {
    this.updateMarketData();
    setInterval(this.updateMarketData, 60000); // Aggiornamento ogni minuto
  },
};
</script>

<template>
  <div>
    <h1>Pagina About</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates
      quia nobis esse ipsa illo, similique reiciendis fugit rem natus explicabo
      non autem labore molestiae saepe facere soluta provident. Sapiente? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis fugit
      repudiandae modi iusto quisquam laboriosam quae earum velit? Ea molestias
      saepe qui distinctio sit reiciendis excepturi voluptates cum amet.
    </p>

    <div class="toolbar">
      <div
        v-for="data in marketData"
        :key="data.symbol"
        class="market-item"
        :style="{ color: data.change >= 0 ? 'green' : 'red' }"
      >
        {{ data.indexName }}: {{ data.price }} ({{ data.change }} /
        {{ data.percentageChange }}%)
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  background-color: #1e1e1e;
  color: white;
  padding: 10px;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
}

.market-item {
  margin-right: 30px;
  font-size: 16px;
}
</style>
