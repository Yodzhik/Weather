import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5'

const urls = {
    weather: '/weather?q=city&appid=39b2f7865704c46a89117f4aaef142f1&units=metric'
}

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    validateStatus: (status) => {
        return status >= 200 && status < 300
    }
})

export const getWeatherAPI = async (c) => {
    try {
        const response = await api.get(urls.weather.replace('city', c))
        const data = await response
        return data.data
    } catch (e) {
        return null
    }
}