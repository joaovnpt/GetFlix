<script setup></script>

<template>
  <nav>
    <div class="links-wrapper">
      <div class="logo">
        <router-link to="/"
          ><img src="../assets/logo.png" alt=""
        /></router-link>
      </div>
      <div class="movies">
        <router-link class="movies-link" to="/">Movies</router-link>
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
  justify-content: start;
  gap: 4rem;
  margin: 1rem 100px;
}

.logo img {
  display: flex;
  align-content: center;
}

.sign-in {
  margin-left: auto;
  background-color: #fff;
  width: 70px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 400ms ease;
}

.sign-in:hover {
  background-color: #838383;
}

.sign-in-link {
  color: #1e1e1e !important;
  height: fit-content;
  width: fit-content;
  font-weight: 500;
}

.search-bar {
  margin: 0 auto;
}

.series-link,
.sign-in-link, .movies-link {
  font-size: 1rem;
  text-decoration: none;
  color: #fff;
  transition: 300ms ease-in-out;
  border-radius: 15px;
}

.series-link:hover, .movies-link:hover {
  text-decoration: underline;
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
  width: 90%;
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
