import React from 'react'

// thirdparty
import PropTypes from 'prop-types'
import CancelIcon from '@material-ui/icons/Cancel'
import ClearIcon from '@material-ui/icons/Clear'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Tooltip from '@material-ui/core/Tooltip'

// internal
import {
  getUser as getUserFromLocal,
  setUser as setUserFromLocal
} from '@/common/userData'
import { calculateAge } from '@/common/utils'
import { getUser as getUserFromApi } from '@/services/user'

const slideWidth = 30

const STATUS_LIKE = 'like'
const STATUS_PASS = 'pass'

const createItem = (items, length, position, idx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`
    },
    user: items[idx].user
  }

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' }
      break
    case length:
      break
    default:
      item.styles = { ...item.styles, opacity: 0 }
      break
  }

  return item
}

const getUserFromService = async (user) => {
  let error, fullUser
  try {
    const result = await getUserFromApi(user.id)
    fullUser = {
      ...result.data,
      ...user
    }
  } catch (err) {
    error = err
  }
  return [error, fullUser]
}

export default function CarouselItem ({ items, length, pos, idx, activeIdx, updateUser }) {
  const item = createItem(items, length, pos, idx, activeIdx)
  let {
    user
  } = item
  const [error, setError] = React.useState(null)
  const [fullUser, setFullUser] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      const [error, fullUser] = await getUserFromService(user)
      if (error) {
        setError(error)
      }
      if (fullUser) {
        setFullUser(fullUser)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (fullUser) {
      setFullUser({
        ...fullUser,
        ...user
      })
    }
  }, [user])

  const storeUserStatus = (id, status) => {
    let userInStorage
    userInStorage = getUserFromLocal(id) || {}

    const statusObject = { status }
    userInStorage = {
      ...userInStorage,
      ...statusObject
    }
    setUserFromLocal(id, userInStorage)
    setFullUser({
      ...fullUser,
      ...userInStorage
    })
    updateUser({
      ...fullUser,
      ...userInStorage
    })
  }

  const onPass = (id) => {
    storeUserStatus(id, STATUS_PASS)
  }

  const onLike = (id) => {
    storeUserStatus(id, STATUS_LIKE)
  }

  const onReset = () => {
    storeUserStatus(id, null)
  }

  if (!fullUser) return null

  const {
    title,
    picture,
    firstName,
    lastName,
    id,
    email,
    status,
    dateOfBirth
  } = fullUser
  const age = calculateAge(dateOfBirth)
  return (
    <li key={id} className='carousel__slide-item' style={item.styles}>
      {
        !error ? (
          <>
            <div className='carousel__slide-item-img-link'>
              <img src={picture} alt={`${firstName}`} />
            </div>
            <div className='carousel-slide-item__body'>
              <h4>{`${title} ${lastName} ${firstName} (${age})`}</h4>
              <p>{email}</p>
              <div className='actions'>
                <div className='action'>
                  { status === STATUS_PASS
                    ? (
                      <Tooltip enterDelay={500} placement='top-end' title={<h2>{`un${STATUS_PASS} ${firstName}`}</h2>} aria-label='unpass' arrow>
                        <CancelIcon onClick={() => { onReset(id) }} fontSize='large' alt='cancel' />
                      </Tooltip>
                    )
                    : (
                      <Tooltip enterDelay={500} placement='top-end' title={<h2>{`${STATUS_PASS} ${firstName}`}</h2>} aria-label='pass' arrow>
                        <ClearIcon onClick={() => { onPass(id) }} fontSize='large' alt='proceed' />
                      </Tooltip>
                    )
                  }
                </div>
                <div className='action'>
                  { status === STATUS_LIKE
                    ? (
                      <Tooltip enterDelay={500} placement='top-start' title={<h2>{`un${STATUS_LIKE} ${firstName}`}</h2>} aria-label='unlike' arrow>
                        <FavoriteIcon onClick={() => { onReset(id) }} fontSize='large' alt='cancel' />
                      </Tooltip>
                    )
                    : (
                      <Tooltip enterDelay={500} placement='top-start' title={<h2>{`${STATUS_LIKE} ${firstName}`}</h2>} aria-label='like' arrow>
                        <FavoriteBorderIcon onClick={() => { onLike(id) }} fontSize='large' alt='proceed' />
                      </Tooltip>
                    )
                  }
                </div>
              </div>
            </div>
          </>
        ) : <div> No user found </div>
      }
    </li>
  )
}

CarouselItem.propTypes = {
  items: PropTypes.array,
  length: PropTypes.number,
  pos: PropTypes.number,
  idx: PropTypes.number,
  activeIdx: PropTypes.number,
  updateUser: PropTypes.func
}
