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
      stockData: null,
      modalVisible: false, // Stato per la visibilità del modal
    };
  },
  methods: {
    async fetchStockData() {
      try {
        const response = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "TIME_SERIES_INTRADAY",
            symbol: "AAPL",
            interval: "5min",
            apikey: "MFJKRQ1VT2HLXOR0",
          },
        });
        this.stockData = response.data["Time Series (5min)"];
      } catch (error) {
        console.error("Errore nel recupero dei dati", error);
      }
    },
    toggleModal() {
      this.modalVisible = !this.modalVisible; // Toggle della visibilità del modal
    },
  },
  mounted() {
    this.fetchStockData();
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
        <swiper-slide><img src="/public/IMG_6642.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6715.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6098.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6214.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6289.jpg" alt="" /></swiper-slide>
        <swiper-slide><img src="/public/IMG_6633.jpg" alt="" /></swiper-slide>
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

    <!-- Icona fissa sul lato destro -->
    <div class="fixed-icon" @click="toggleModal">
      <img src="/public/news-icon-2.png" alt="Fixed Icon" />
    </div>

    <!-- Modal -->
    <div class="modal" v-if="modalVisible">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Notizie</h2>
          <button @click="toggleModal" class="close-button">Chiudi</button>
        </div>
        <div class="modal-body">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
          consectetur consequatur soluta sunt sequi rerum doloremque a laborum
          et cum illo necessitatibus, nostrum omnis commodi. Commodi ut
          temporibus quae animi.
        </div>
      </div>
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
  object-fit: contain;
  object-position: center;
}

.stock-banner {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-top: 20px;
  border-radius: 10px;
}

.fixed-icon {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.fixed-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fixed-icon:hover {
  transform: scale(1.1);
}

/* Popup con posizionamento corretto */
.popup-window {
  position: absolute;
  right: 0; /* Posiziona il popup direttamente accanto all'icona */
  bottom: 60px; /* Distanza dal fondo dell'icona, puoi regolare a tuo piacimento */
  width: 300px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.popup-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  text-align: justify;
}

/* Condizione per la visualizzazione del popup */
.fixed-icon:hover .popup-window {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .fixed-icon {
    display: none; /* Nasconde l'icona per le news */
  }
}

/* Stile per il modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 32, 41, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px; /* Larghezza del modal */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background-color: #ff0000; /* Rosso per il pulsante di chiusura */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #cc0000; /* Colore più scuro al passaggio del mouse */
}

/* Altri stili rimangono invariati... */
</style>
