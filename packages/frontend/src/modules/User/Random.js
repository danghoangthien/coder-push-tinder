import React from 'react'
import lodash from 'lodash'
import { getUsers } from '@/services/user'
import CarouselContainer from './Sprites/Carousel'

// internal
import {
  getUser as getUserFromLocal
} from '@/common/userData'

const getListFromService = async () => {
  let error, users
  try {
    const result = await getUsers()
    users = result.data.data
    users = users.map((user) => {
      const localUser = getUserFromLocal(user.id) || {}
      return {
        ...user,
        ...localUser
      }
    })
  } catch (err) {
    error = err
  }
  return [error, users]
}

export default function Random () {
  const [error, setError] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      setIsLoading(true)
      const [error, users] = await getListFromService()
      if (error) {
        setError(error)
      }
      if (users) {
        console.log(users)
        setUsers(users)
      }
      setIsLoading(false)
    })()
  }, [])

  const updateUser = (user) => {
    const _users = users.map(_user => {
      if (user.id === _user.id) {
        return user
      }
      return _user
    })
    console.log('_users', _users)
    setUsers(_users)
  }

  const renderUsers = () => {
    console.log('renderUsers', users)
    if (isLoading) {
      return <></>
    }
    if (lodash.isEmpty(users)) {
      return <h3> No user available </h3>
    }
    return <CarouselContainer {...{ users, updateUser }} />
  }

  return (
    <>
      {
        !error ? (renderUsers()) : (<h3>Error</h3>)
      }
    </>
  )
}
