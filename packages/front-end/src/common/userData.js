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


export function setUser (id, user_data) {
  let user_dict = get(userListKey)
  console.log('[setUser] user_dict & user_data', user_dict, id, user_data)
  if(!user_dict) {
    user_dict = {}
  }
  user_dict[id] = user_data
  console.log('user_dict on save', user_dict)
  set(user_dict)
}

const set = (user_dict) => {
  console.log('user_dict on set', user_dict)
  localStorage.setItem(userListKey, JSON.stringify(user_dict))
}

const get = () => {
  return JSON.parse(localStorage.getItem(userListKey))
}

export function getUser (uuid) {
  const user_dict = get()
  if (lodash.isEmpty(user_dict)) {
    return null
  }
  return user_dict[uuid]
}

