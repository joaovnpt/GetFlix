<script setup></script>

<template>
  <nav>
    <div class="logo"><router-link to="/movies"><img src="../assets/logo.png" alt="" /></router-link></div>
    <div class="series">
      <router-link class="series-link" to="/tv">Series</router-link>
    </div>
    <div class="search-bar">
      <i class="fa fa-search"></i>
      <input
        type="text"
        placeholder="What do you want to watch?"
        class="search-input"
      />
    </div>
    <div class="sign-in"><p>Sign In</p></div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100px;
  background: linear-gradient(#000000, #00000000);
}

.logo img {
  width: 100px;
  height: 100px;
}

.series-link {
  text-decoration: none;
  color: #dad8d8;
}

.search-bar {
  width: 23rem;
  height: 2.5rem;
  border: 1px solid #dad8d8;
  border-radius: 12px;
  padding: 0rem 1.5rem;
  display: flex;
  justify-content: start;
  align-items: center;
  background: none;
}

.search-input {
  border: none;
  color: #dad8d8;
  outline: none;
  font-size: 1rem;
  margin: 0 0 0 1rem;
  background: none;
}

.fa.fa-search {
  color: #dad8d8;
}

p {
  color: #dad8d8;
}
</style>
