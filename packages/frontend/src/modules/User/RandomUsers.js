import React from 'react'
import { getUsers } from '@/services/user'
import Item from './Sprites/Item'
import Fade from '@material-ui/core/Fade'
import './RandomUsers.scss'

const getListFromService = async() => {
  let error, users
  try {
    const result = await getUsers()
    users = result.data.data
  } catch (err) {
    error = err
  }
  return [error, users]
}

export default function RandomUsers() {
  const [error, setError] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [itemLoaded, setItemLoaded] = React.useState(false)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    (async() => {
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
    setUsers(_users)
  }
  console.log('updateUser', updateUser)

  const onPrev = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const onNext = () => {
    if (page < users.length) {
      setPage(page + 1)
    }
  }

  const renderUsers = () => {
    if (isLoading) {
      return <></>
    }
    if (!users) {
      return <h3> No users available </h3>
    }
    return (
      <>
        <div className='user-container'>
          <Fade in={itemLoaded}>
            <div>
              <Item user={users[page - 1]} itemLoaded={itemLoaded} setItemLoaded={setItemLoaded} />
              <div className='user-navigation'>
                {
                  (page > 1) && (
                    <span className='prev' onClick={() => onPrev()}>
                      &lsaquo;
                    </span>
                  )
                }
                {
                  (page < users.length) && (
                    <span className='next' onClick={() => onNext()}>
                      &rsaquo;
                    </span>
                  )
                }
              </div>
            </div>
          </Fade>
        </div>
      </>
    )
  }

  return (
    <>
      {
        !error ? (renderUsers()) : (<h3>There is error while fetching users</h3>)
      }
    </>
  )
}
