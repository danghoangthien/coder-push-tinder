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

export function setUser (id, userData) {
  let userDict = get(userListKey)
  if (!userDict) {
    userDict = {}
  }
  userDict[id] = userData
  set(userDict)
}

const set = (userDict) => {
  localStorage.setItem(userListKey, JSON.stringify(userDict))
}

const get = () => {
  return JSON.parse(localStorage.getItem(userListKey))
}

export function getUser (uuid) {
  const userDict = get()
  if (lodash.isEmpty(userDict)) {
    return null
  }
  return userDict[uuid]
}
