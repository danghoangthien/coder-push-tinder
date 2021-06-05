import axios from 'axios'
import { ENDPOINT, APP_ID } from './const'

const ENTITY = 'user'

export const getUsers = async (limit = 10) => {
  console.log('limit', limit)
  return axios.get(`${ENDPOINT}/${ENTITY}`,
    { 
      params: { limit },
      headers: { 'app-id': APP_ID }
    }
  )
}