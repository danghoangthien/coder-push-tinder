import axios from 'axios'
import { ENDPOINT, APP_ID } from './const'

const ENTITY = 'user'

export const getUsers = async (limit = 10) => {
  return axios.get(`${ENDPOINT}/${ENTITY}`,
    {
      params: { limit },
      headers: { 'app-id': APP_ID }
    }
  )
}

export const getUser = async (id) => {
  return axios.get(`${ENDPOINT}/${ENTITY}/${id}`,
    {
      headers: { 'app-id': APP_ID }
    }
  )
}
