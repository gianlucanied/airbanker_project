<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      stockData: null, // Variabile per salvare i dati dell'API
    };
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  mounted() {
    this.fetchStockData(); // Chiama la funzione per recuperare i dati all'avvio del componente
  },
  methods: {
    async fetchStockData() {
      try {
        const response = await axios.get(
          "https://www.alphavantage.co/query", // Endpoint dell'API (Alpha Vantage è un esempio)
          {
            params: {
              function: "TIME_SERIES_INTRADAY", // Specifica la funzione che desideri
              symbol: "AAPL", // Scegli il simbolo dell'azienda (esempio: AAPL per Apple)
              interval: "5min", // Intervallo di tempo
              apikey: "MFJKRQ1VT2HLXOR0", // Chiave API (sostituisci con la tua chiave personale)
            },
          }
        );
        this.stockData = response.data["Time Series (5min)"];
      } catch (error) {
        console.error("Errore nel recupero dei dati", error);
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide><img src="/public/IMG_6827.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6642.jpg" alt="" /></swiper-slide
        ><swiper-slide><img src="/public/IMG_6715.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6098.jpg" alt="" /></swiper-slide
        ><swiper-slide><img src="/public/IMG_6214.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6289.jpg" alt="" /></swiper-slide
        ><swiper-slide><img src="/public/IMG_6633.jpg" alt="" /></swiper-slide>
      </swiper>
    </div>

    <!-- Banner con dati della borsa -->
    <div class="stock-banner" v-if="stockData">
      <h3>Dati di Borsa per AAPL</h3>
      <ul>
        <li v-for="(value, key) in stockData" :key="key">
          <strong>{{ key }}:</strong> {{ value["1. open"] }} (Apertura),
          {{ value["4. close"] }} (Chiusura)
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mySwiper {
  height: 80vh;
}

.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Fa sì che l'immagine mantenga le proporzioni senza essere tagliata */
  object-position: center; /* Centra l'immagine all'interno del contenitore */
}

.stock-banner {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
