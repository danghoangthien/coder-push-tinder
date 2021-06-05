import lodash from 'lodash'

const userListKey = 'user_list'

/**
 * User List structure
 * {
 *  "<uuid>": {
 *    "status": "like"|"pass" 
 *  }
 * }
 */


export function setUser (user) {
  let user_list = get(userListKey)
  if(!user_list) {
    user_list = {}
  }
  user_list = {
    ...user_list,
    user
  }
  set(userListKey, JSON.stringify(user_list))
}

const set = (user_list) => {
  localStorage.setItem(userListKey, JSON.stringify(user_list))
}

const get = () => {
  return JSON.parse(localStorage.getItem(userListKey))
}

export function getUser (uuid) {
  const user_list = get(userListKey)
  if (lodash.isEmpty(user_list)) {
    return null
  }
  return user_list[uuid]
}

