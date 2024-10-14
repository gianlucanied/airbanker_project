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
      popupVisible: false, // Stato per la visibilità del popup
      popupHovered: false, // Stato per mantenere il popup aperto quando il mouse è sul popup
    };
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
    showPopup() {
      this.popupVisible = true; // Mostra il popup
    },
    hidePopup() {
      // Chiudi il popup solo se il mouse non è sopra il popup
      if (!this.popupHovered) {
        this.popupVisible = false;
      }
    },
    enterPopup() {
      this.popupHovered = true; // Mantiene il popup aperto
    },
    leavePopup() {
      this.popupHovered = false; // Imposta lo stato per chiudere il popup
      this.popupVisible = false; // Nasconde il popup
    },
  },
  mounted() {
    this.fetchStockData(); // Chiama la funzione per recuperare i dati all'avvio del componente
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

    <!-- Icona fissa sul lato destro con il popup -->
    <div class="fixed-icon" @mouseenter="showPopup" @mouseleave="hidePopup">
      <img src="/public/news-icon-2.png" alt="Fixed Icon" />
      <!-- Finestra popup -->
      <div
        class="popup-window"
        v-if="popupVisible"
        @mouseenter="enterPopup"
        @mouseleave="leavePopup"
      >
        <div class="popup-content">
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
</style>
