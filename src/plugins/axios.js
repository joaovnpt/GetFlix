import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzRiOWZiOTIwMjE2ODFjMGQxMjQ0Y2M4NmMxYjQ3YyIsIm5iZiI6MTczMTc3MDExNi43MzkyNzM1LCJzdWIiOiI2NzM4YjVhYTZhMDJhMjRkN2IyMTU4MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VF_oNJeTFp9TdhpD0fwwZFoiCN2andyQfED3KkvQ5gA`
    },
})

export default api;