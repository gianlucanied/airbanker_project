<script>
export default {
  name: "AppHeader",
  data() {
    return {
      currentPage: "",
      isHeaderHidden: false,
      timeout: null,
    };
  },
  watch: {
    $route(to) {
      this.currentPage = to.name;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.timeout) clearTimeout(this.timeout);
      const isAtTop =
        window.scrollY === 0 || document.documentElement.scrollTop === 0;

      if (isAtTop) {
        this.isHeaderHidden = false;
      } else {
        this.isHeaderHidden = true;
        this.timeout = setTimeout(() => {
          this.isHeaderHidden = false;
        }, 1000);
      }
    },
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-fixed"
    :class="{ 'navbar-hidden': isHeaderHidden }"
  >
    <div class="container">
      <!-- Logo e link Home -->
      <a class="navbar-brand" href="#">
        <router-link :to="{ name: 'home' }">
          <img src="/public/logo_3-removebg.png" alt="Logo" />
        </router-link>
      </a>

      <!-- Hamburger button per mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Lista di navigazione -->
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li
            class="nav-item fromCenter"
            :class="{ active: currentPage === 'home' }"
          >
            <router-link :to="{ name: 'home' }" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: currentPage === 'other' }">
            <router-link :to="{ name: 'other' }" class="nav-link">
              Other page
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: currentPage === 'about' }">
            <router-link :to="{ name: 'about' }" class="nav-link">
              About us
            </router-link>
          </li>

          <!-- Bottone Login per mobile, che appare nell'hamburger -->
          <li class="nav-item d-lg-none">
            <router-link class="button-33" role="button">Login</router-link>
          </li>
        </ul>
      </div>

      <!-- Bottone Login a destra solo per desktop -->
      <div class="login-container d-none d-lg-flex">
        <router-link class="button-33" role="button">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-fixed {
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.4s ease-in-out;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  width: 200px;
}
.navbar .navbar-nav .nav-item {
  margin: 0 1rem;
}
.nav-link {
  text-decoration: none;
  color: #101e39;
  font-size: 1.2rem;
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  border-bottom: none;
  transition: color 0.5s;
}
.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 3px;
  bottom: 0;
  left: 0;
  background-color: #5bb7b2;
  transition: width 0.4s ease-in-out;
}
.nav-link:hover {
  color: #5bb7b2;
}
.nav-link:hover::after {
  width: 100%;
}
.navbar .navbar-nav .nav-item.active .nav-link {
  color: black;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}
.navbar .navbar-nav .nav-item.active .nav-link::after {
  width: 100%;
  background-color: #5bb7b2;
}
.login-container {
  display: flex;
  align-items: center;
}

.button-33 {
  background: linear-gradient(135deg, #5bb7b2 0%, #5bb7b2 50%, #36d1dc 100%);
  border-radius: 50px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  color: white;
  cursor: pointer;
  display: inline-block;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-33:hover {
  background: linear-gradient(135deg, #36d1dc 0%, #5bb7b2 100%);
  transform: scale(1.08);
  box-shadow: rgba(17, 17, 26, 0.2) 0px 8px 24px,
    rgba(17, 17, 26, 0.2) 0px 16px 56px, rgba(17, 17, 26, 0.2) 0px 24px 80px;
  border: none;
}

.button-33:active {
  transform: scale(1.02);
  box-shadow: none;
}

@media (max-width: 768px) {
  .container {
    justify-content: space-around;
  }
  .navbar-collapse {
    justify-content: center;
  }
  .button-33 {
    margin-top: 20px;
  }
}
</style>
