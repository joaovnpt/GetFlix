<script setup>
import { ref, onMounted } from 'vue'

const genres = ref([])

onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR')
    genres.value = response.data.genres
})
</script>

<template>
    <main>
        <h1>Movies Genres</h1>
        <ul>
            <li v-for="genre in genres" :key="genre.id"></li>
        </ul>
    </main>
</template>