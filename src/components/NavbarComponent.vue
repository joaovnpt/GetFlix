<script setup></script>

<template>
  <nav>
    <div class="links-wrapper">
      <div class="logo">
        <router-link to="/movies"
          ><img src="../assets/logo.png" alt=""
        /></router-link>
      </div>
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
      <div class="sign-in">
        <router-link class="sign-in-link" to="/signin">Sign in</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  z-index: 1000;
  position: absolute;
  top: 0;
  height: 100px;
  width: 100%;
}

.links-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto 100px;
}

.logo img {
  width: 120px;
  height: 120px;
}

.series-link,
.sign-in-link {
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
}

::placeholder {
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
  font-size: 20px;
  color: #ffffff;
}
</style>
