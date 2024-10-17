<script>
import axios from "axios";
import AOS from "aos"; // Importa AOS
import "aos/dist/aos.css"; // Importa il CSS di AOS
import { ref } from "vue";

export default {
  setup() {
    const modalVisible = ref(false); // Rendi modalVisible un ref

    const lineChartSeries = ref([
      {
        name: "Risparmio",
        data: [],
      },
    ]);

    const lineChartOptions = ref({
      chart: {
        id: "risparmio-chart",
      },
      xaxis: {
        categories: [],
        min: 50, // Inizia da 50
        tickAmount: 5, // Mostra i multipli di 5
        labels: {
          formatter: (val) => {
            return Math.floor(val); // Rimuove i decimali dalle etichette
          },
        },
      },
      yaxis: {
        tickAmount: 5, // Mostra i multipli di 500 (numero di tacche sull'asse Y)
        labels: {
          formatter: (val) => {
            return val >= 500 ? val : ""; // Mostra solo i multipli di 500
          },
        },
      },
    });

    const age = ref(18); // Età inserita dal cliente
    const monthlySaving = ref(50); // Risparmio mensile inserito dal cliente

    const newValue = ref(null); // Aggiungi questa riga per dichiarare newValue
    const newIndex = ref(null); // Aggiungi questa riga per dichiarare newIndex

    const calculateSavings = () => {
      const currentAge = age.value; // Età inserita dall'utente
      const targetAge = 67; // Età target
      const savings = [];
      const categories = [];

      // Ciclo per creare le categorie (età) e i risparmi corrispondenti
      for (let i = currentAge; i <= targetAge; i++) {
        categories.push(i); // Aggiungi l'età come etichetta sull'asse X
        const totalSavings = monthlySaving.value * 12 * (i - currentAge); // Calcola il risparmio totale
        savings.push(totalSavings); // Aggiungi il risparmio per ogni anno
      }

      // Aggiorna i dati del grafico
      lineChartSeries.value[0].data = savings;
      lineChartOptions.value.xaxis.categories = categories; // Imposta le categorie come gli anni
    };

    // Definizione della funzione updateChartData
    const updateChartData = (newData) => {
      lineChartSeries.value[0].data = newData.data; // Aggiorna con nuovi dati
      lineChartOptions.value.xaxis.categories = newData.categories; // Aggiorna con nuove categorie
    };

    return {
      lineChartSeries,
      lineChartOptions,
      age,
      monthlySaving,
      calculateSavings,
      stockData: null,
      modalVisible,
      activeSlide: 0,
      images: [
        "/image001.png",
        "/IMG_6098.jpg",
        "/IMG_6289.jpg",
        "/IMG_6715.jpg",
        "/IMG_6827.jpg",
        "/IMG_6872.jpg",
      ],
      confirmationMessage: "",
      newValue, // Aggiungi newValue al ritorno
      newIndex, // Aggiungi newIndex al ritorno
      updateChartData, // Assicurati di definire updateChartData o rimuovilo se non è necessario
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
      console.log("Modal visibility before:", this.modalVisible);
      this.modalVisible = !this.modalVisible;
      console.log("Modal visibility after:", this.modalVisible);
    },

    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.images.length;
    },
    async submitForm(event) {
      event.preventDefault();

      const formData = new FormData(event.target);

      try {
        await axios.post("https://formspree.io/f/manyybvw", formData);
        this.confirmationMessage = alert("Messaggio inviato con successo!");
        event.target.reset();
      } catch (error) {
        console.error("Errore durante l'invio del modulo", error);
        this.confirmationMessage = alert(
          "Errore durante l'invio del messaggio, riprova."
        );
      }
    },
  },
  mounted() {
    this.fetchStockData();
    AOS.init();
    setInterval(this.nextSlide, 3000); // Cambia slide ogni 2 secondi
  },
};
</script>

<template>
  <div class="container-fluid">
    <!-- Jumbotron con carosello -->
    <div class="jumbotron">
      <div class="carousel">
        <img :src="images[activeSlide]" alt="Slide" />
        <div class="carousel-text">
          <h1>Benvenuti nel nostro sito</h1>
          <p>Esplora le nostre ultime novità</p>
        </div>
      </div>
    </div>

    <div class="container-chart">
      <apexchart
        type="line"
        :series="lineChartSeries"
        :options="lineChartOptions"
      />
      <!-- Input per calcolare il risparmio -->
      <div class="input-container">
        <label for="age">Età attuale:</label>
        <input type="number" id="age" v-model="age" min="0" max="67" />
        <label for="monthlySaving">Risparmio mensile:</label>
        <input type="number" id="monthlySaving" v-model="monthlySaving" />
        <button @click="calculateSavings">Calcola Risparmio</button>
      </div>
    </div>

    <div class="fixed-icon" @click="toggleModal">
      <img src="/small_logo.png" alt="Fixed Icon" />
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div class="modal" v-if="modalVisible">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Notizie</h2>
            <button @click="toggleModal" class="close-button">Chiudi</button>
          </div>
          <div class="modal-body">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>
    </transition>

    <!-- Modulo Contatto -->
    <div class="background">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="screen">
          <div class="screen-header">
            <div
              class="screen-header-left"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div class="screen-header-button close"></div>
              <div class="screen-header-button maximize"></div>
              <div class="screen-header-button minimize"></div>
            </div>
            <div
              class="screen-header-right"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div class="screen-header-ellipsis"></div>
              <div class="screen-header-ellipsis"></div>
              <div class="screen-header-ellipsis"></div>
            </div>
          </div>
          <div class="screen-body">
            <div class="screen-body-item left">
              <div class="app-title">
                <span data-aos="fade-right" data-aos-delay="100"
                  >CONTACT US</span
                >
              </div>
            </div>
            <div
              class="screen-body-item"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <form @submit="submitForm" class="app-form">
                <div class="app-form-group">
                  <label for="name">Nome:</label>
                  <input
                    type="text"
                    class="app-form-control form-input"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div class="app-form-group">
                  <label for="surname">Cognome:</label>
                  <input
                    type="text"
                    class="app-form-control form-input"
                    id="surname"
                    name="surname"
                    required
                  />
                </div>

                <div class="app-form-group">
                  <label for="email">La tua email:</label>
                  <input
                    type="email"
                    class="app-form-control form-input"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div class="app-form-group message">
                  <label for="message">Il tuo messaggio:</label>
                  <textarea
                    class="app-form-control form-textarea"
                    id="message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div class="app-form-group buttons">
                  <button type="submit" class="app-form-button form-button">
                    Invia
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Messaggio di conferma -->
    <div v-if="confirmationMessage" class="confirmation-message">
      {{ confirmationMessage }}
    </div>
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
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.fixed-icon img {
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 20px;
}

.fixed-icon:hover {
  transform: scale(1.1);
}

/* Stile grafico */
.container-chart {
  margin: 40px auto; /* Margine superiore per dare spazio attorno al grafico */
  padding: 20px; /* Spazio interno per il grafico */
  background-color: #f9f9f9; /* Colore di sfondo leggero */
  border-radius: 12px; /* Bordi arrotondati per un aspetto più morbido */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Leggera ombra per profondità */
  max-width: 800px; /* Larghezza massima del contenitore */
  border: 1px solid #e0e0e0; /* Bordo leggero */
  transition: transform 0.3s ease; /* Transizione per l'effetto hover */
}

.container-chart:hover {
  transform: scale(
    1.02
  ); /* Effetto di ingrandimento leggero al passaggio del mouse */
}

/* Aggiungi uno stile per gli input del grafico */
.input-container {
  margin: 20px 0; /* Margine attorno agli input */
}

.input-container label {
  display: block; /* Ogni etichetta su una nuova riga */
  margin: 10px 0 5px; /* Spazio attorno alle etichette */
}

.input-container input {
  margin-bottom: 10px; /* Spazio sotto gli input */
  padding: 8px; /* Padding interno */
  border: 1px solid #ccc; /* Bordo grigio chiaro */
  border-radius: 4px; /* Bordo arrotondato */
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
}

.form-input,
.form-textarea {
  width: 100%; /* Larghezza completa */
  padding: 10px; /* Padding interno */
  margin-bottom: 20px; /* Spazio tra i campi */
  border: 1px solid #ccc; /* Bordo grigio chiaro */
  border-radius: 4px; /* Bordo arrotondato */
}

.form-button {
  background-color: #007bff; /* Colore di sfondo blu */
  color: white; /* Colore del testo */
  border: none; /* Nessun bordo */
  border-radius: 4px; /* Bordo arrotondato */
  padding: 10px 15px; /* Padding */
  cursor: pointer; /* Punta del cursore */
  transition: background-color 0.3s; /* Transizione per il pulsante */
}

.form-button:hover {
  background-color: white; /* Colore di sfondo più scuro al passaggio del mouse */
}

.confirmation-message {
  margin-top: 20px; /* Spazio sopra il messaggio */
  font-size: 1.2em; /* Dimensione del testo del messaggio */
  color: green; /* Colore verde per il messaggio di conferma */
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: linear-gradient(to right, white 0%, white 100%);
  font-size: 12px;
}

body,
button,
input {
  font-weight: 700;
}

.background {
  display: flex;
  min-height: 100vh;
}

.container {
  flex: 0 1 700px;
  margin: auto;
  padding: 10px;
  margin-bottom: 125px;
}

.screen {
  position: relative;
  background: #5bb7b2;
  border-radius: 15px;
}

.screen:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: -1;
}

.screen-header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: black;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.screen-header-left {
  margin-right: auto;
}

.screen-header-button {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border-radius: 8px;
  background: white;
}

.screen-header-button.close {
  background: #ed1c6f;
}

.screen-header-button.maximize {
  background: #e8e925;
}

.screen-header-button.minimize {
  background: #74c54f;
}

.screen-header-right {
  display: flex;
}

.screen-header-ellipsis {
  width: 3px;
  height: 3px;
  margin-left: 2px;
  border-radius: 8px;
  background: #999;
}

.screen-body {
  display: flex;
}

.screen-body-item {
  flex: 1;
  padding: 50px;
}

.screen-body-item.left {
  display: flex;
  flex-direction: column;
}

.app-title {
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;
  font-size: 26px;
}

.app-title:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 25px;
  height: 4px;
  background: black;
}

.app-contact {
  margin-top: auto;
  font-size: 8px;
  color: #888;
}

.app-form-group {
  margin-bottom: 15px;
}

.app-form-group.message {
  margin-top: 40px;
}

.app-form-group.buttons {
  margin-bottom: 0;
  text-align: right;
}

.app-form-control {
  width: 100%;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #666;
  color: #ddd;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.app-form-control::placeholder {
  color: #666;
}

.app-form-control:focus {
  border-bottom-color: #ddd;
}

.app-form-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.app-form-button:hover {
  color: black;
}

.credits {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #ffa4bd;
  font-size: 16px;
  font-weight: normal;
}

.credits-link {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.dribbble {
  width: 20px;
  height: 20px;
  margin: 0 5px;
}

@media screen and (max-width: 520px) {
  .screen-body {
    flex-direction: column;
  }

  .screen-body-item.left {
    margin-bottom: 30px;
  }

  .app-title {
    flex-direction: row;
  }

  .app-title span {
    margin-right: 12px;
  }

  .app-title:after {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .screen-body {
    padding: 40px;
  }

  .screen-body-item {
    padding: 0;
  }
}
</style>
