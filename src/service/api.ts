import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const api = axios.create({
  baseURL: 'http://192.168.2.255:3333',
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
