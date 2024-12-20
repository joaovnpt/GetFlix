<script setup></script>

<template>
  <div class="container">
    <h1>Which is on your vibe now?</h1>
    <div class="options">
      <button href="">
        <router-link class="router" to="/movies">Movies</router-link>
      </button>
      <button href="" class="btn-1">
        <router-link class="router" to="/tv">Series</router-link>
      </button>
    </div>
  </div>
  <div class="circle"></div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 80vh;
  gap: 3rem;
}
h1 {
  margin: 0 auto;
  font-size: 4rem;
  width: 890px;
  animation: digitando 3s steps(25), blink 0.4s infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid;
}

@keyframes digitando {
  from {
    width: 0;
  }
}

@keyframes blink {
  40% {
    border-color: #ffffff2c;
  }
}

.options {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.router {
  text-decoration: none;
}

.btn-1 {
  background-image: linear-gradient(50deg, #831dcc, #5b42f3 50%);
}

button {
  align-items: center;
  background-image: linear-gradient(144deg, #5b42f3 50%, #831dcc);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.158) 5px 5px 5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 19px 24px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

button:hover,
.btn-1:hover {
  transform: scale(1.04);
}

button:active,
button:hover {
  outline: 0;
}

.circle {
  border-radius: 50%;
  margin: 0 auto;
  width: 50vw;
  height: 50vh;
  background: radial-gradient(
    circle,
    rgba(118, 7, 209, 0.438),
    #1e1e1e 90%
  );
  background-color: #1e1e1e;
  filter: blur(60px);
}
</style>
