import axios from 'axios'  

const Instance = axios.create({ 
    baseURL: 'http://localhost:5550/api',
})

export default Instance