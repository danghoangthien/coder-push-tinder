import axios from 'axios'
import { ENDPOINT, getCurrentUserId } from './const'

const ENTITY = 'user'

const currentUserId = getCurrentUserId()

export const getUsers = async(limit = 10) => {
  console.log('ENDPOINT', ENDPOINT)
  return axios.get(`${ENDPOINT}/${ENTITY}`,
    {
      params: { limit }
    }
  )
}

export const getUser = async(id, baseUserId) => {
  return axios.get(`${ENDPOINT}/${ENTITY}/${id}`,
    {
      headers: { 'base_user_id': currentUserId }
    }
  )
}

export const reactUser = async(targetUserId, type) => {
  return axios.post(`${ENDPOINT}/${ENTITY}/${type}`,
    {
      targetUserId
    },
    {
      headers: { 'base_user_id': currentUserId }
    }
  )
}
