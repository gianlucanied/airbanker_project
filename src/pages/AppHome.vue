<script>
import axios from "axios";

export default {
  data() {
    return {
      stockData: null,
      modalVisible: false, // Stato per la visibilità del modal
      activeSlide: 0, // Stato per il carosello
      images: [
        "/IMG_6098.jpg",
        "/IMG_6289.jpg",
        "/IMG_6715.jpg",
        "/IMG_6827.jpg",
        "/IMG_6872.jpg",
      ], // Array delle immagini del carosello
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
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.images.length; // Cambio automatico del carosello
    },
  },
  mounted() {
    this.fetchStockData();
    setInterval(this.nextSlide, 2000); // Cambia slide ogni 2 secondi
  },
};
</script>

<template>
  <div class="container-fluid">
    <!-- Jumbotron con carosello -->
    <div class="jumbotron">
      <div class="carousel">
        <img :src="images[activeSlide]" alt="Slide" />
        <!-- Testo fisso sopra il carosello -->
        <div class="carousel-text">
          <h1>Benvenuti nel nostro sito</h1>
          <p>Esplora le nostre ultime novità</p>
        </div>
      </div>
    </div>

    <!-- Banner con dati della borsa -->
    <!-- <div class="stock-banner" v-if="stockData">
      <h3>Dati di Borsa per AAPL</h3>
      <ul>
        <li v-for="(value, key) in stockData" :key="key">
          <strong>{{ key }}:</strong> {{ value["1. open"] }} (Apertura),
          {{ value["4. close"] }} (Chiusura)
        </li>
      </ul>
    </div> -->
    <div id="prova"></div>

    <!-- Icona fissa sul lato destro -->
    <div class="fixed-icon" @click="toggleModal">
      <img src="/public/news-icon-2.png" alt="Fixed Icon" />
    </div>

    <!-- Modal -->
    <!-- Modal -->
    <transition name="fade">
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
    </transition>

    <!-- Modulo Contatto -->

    <form
      action="https://formspree.io/f/manyybvw"
      method="POST"
      class="contact-form"
    >
      <h1>Contattaci:</h1>
      <label for="name">Nome:</label>
      <input type="text" name="name" id="name" required class="form-input" />

      <label for="surname">Cognome:</label>
      <input
        type="text"
        name="surname"
        id="surname"
        required
        class="form-input"
      />

      <label for="phone">Numero di cellulare:</label>
      <input type="tel" name="phone" id="phone" required class="form-input" />

      <label for="email">La tua email:</label>
      <input type="email" name="email" id="email" required class="form-input" />

      <label for="message">Il tuo messaggio:</label>
      <textarea
        name="message"
        id="message"
        required
        class="form-textarea"
      ></textarea>

      <button type="submit" class="form-button">Invia</button>
    </form>
  </div>
</template>

<style scoped>
#prova {
  height: 1000px;
}
.jumbotron {
  margin-top: 100px;
  position: relative;
  height: 600px;
  width: 100%;
  background-color: #e9ecef;
  overflow: hidden;
}

.carousel {
  position: relative;
  height: 100%;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.carousel-text {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
  font-size: 50px;
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

/* Stile per il modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

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
  border-radius: 12px; /* Bordi più arrotondati */
  padding: 30px; /* Aumentato padding per più spazio */
  width: 450px; /* Larghezza leggermente aumentata */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Ombra più forte */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px; /* Padding maggiore per il pulsante */
  cursor: pointer;
  transition: background-color 0.3s; /* Transizione per il pulsante */
}

.close-button:hover {
  background-color: #cc0000;
}

.contact-form {
  background-color: #f8f9fa; /* Colore di sfondo chiaro */
  padding: 20px; /* Padding interno */
  border-radius: 10px; /* Bordo arrotondato */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombra leggera */
  max-width: 500px; /* Larghezza massima del modulo */
  margin: 20px auto; /* Margine automatico per centrare */
}

.contact-form label {
  display: block; /* Ogni etichetta su una nuova riga */
  margin-bottom: 8px; /* Spazio sotto le etichette */
  font-weight: bold; /* Grassetto per le etichette */
  color: #333; /* Colore del testo delle etichette */
}

.form-input,
.form-textarea {
  width: 100%; /* Larghezza al 100% */
  padding: 10px; /* Padding interno */
  margin-bottom: 15px; /* Spazio sotto i campi */
  border: 1px solid #ccc; /* Bordo grigio */
  border-radius: 5px; /* Bordo arrotondato */
  font-size: 16px; /* Dimensione del font */
  transition: border-color 0.3s; /* Transizione per il colore del bordo */
}

.form-input:focus,
.form-textarea:focus {
  border-color: #007bff; /* Colore del bordo al focus */
  outline: none; /* Rimuove il contorno predefinito */
}

.form-button {
  background-color: #007bff; /* Colore di sfondo blu */
  color: white; /* Colore del testo bianco */
  padding: 10px 15px; /* Padding interno */
  border: none; /* Nessun bordo */
  border-radius: 5px; /* Bordo arrotondato */
  cursor: pointer; /* Cambia il cursore al passaggio del mouse */
  font-size: 16px; /* Dimensione del font */
  transition: background-color 0.3s; /* Transizione per il colore di sfondo */
}

.form-button:hover {
  background-color: #0056b3; /* Colore di sfondo al passaggio del mouse */
}
</style>
