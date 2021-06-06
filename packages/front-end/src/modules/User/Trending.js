import React from 'react'
import lodash from 'lodash'
import { getUsers } from  '@/services/user'
import Carousel from './Sprites/Carousel'

const getListFromService = async () => {
  let error, users
  try {
    const result = await getUsers()
    console.log('result.data', result.data)
    users = result.data.data
  } catch (err) {
    error = err
  }
  return [error, users]
}

export default function _ (props) {
  
  const [error, setError]  = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(() => {
    ( async () => {
      setIsLoading(true)
      const [error, users] = await getListFromService()
      if (error) {
        setError(error)
      }
      if (users) {
        setUsers(users)
      }
      setIsLoading(false)
    })()
  }, [])
  
  const renderUsers = () => {
    if (isLoading) {
      return <></>
    }
    if (lodash.isEmpty(users)) {
      return <h3> No user available </h3>
    }
    console.log(users)
    return <Carousel {...{users}} />
  }
    
  return (
    <>
    {
    !error ? (renderUsers()) : (<h3>Error</h3>)
    }
    </>
  )
}
