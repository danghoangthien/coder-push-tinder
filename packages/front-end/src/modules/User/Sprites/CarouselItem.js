import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ClearIcon from '@material-ui/icons/Clear'
import CancelIcon from '@material-ui/icons/Cancel'
import { getUser, setUser } from  '@/common/userData'

const slideWidth = 30

const STATUS_LIKE = 'like'
const STATUS_PASS = 'pass'

const createItem = (items, length, position, idx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    user: items[idx].user,
  }

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = {...item.styles, filter: 'grayscale(1)'}
      break
    case length:
      break
    default:
      item.styles = {...item.styles, opacity: 0}
      break
  }

  return item
}

export default function _ ({items, length, pos, idx, activeIdx}) {
  const item = createItem(items, length, pos, idx, activeIdx)
  let {
    user
  } = item
  const localUser = getUser(user.id) || { id : {} }
  user = {
    ...user,
    ...localUser
  }
  
  const [currentUser, setCurrentUser] = React.useState(user)
  
  const  { 
    title,
    picture,
    firstName,
    lastName,
    id,
    email,
    status
  } = currentUser
  
  const storeUserStatus = (id, status) => {
    let userInStorage
    userInStorage = getUser(id) || {}
    
    const statusObject = { status }
    userInStorage = {
      ...userInStorage,
      ...statusObject
    }
    setUser(id, userInStorage)
    setCurrentUser({
      ...currentUser,
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
  
  return (
    <li key={id} className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        <img src={picture} alt={`${title} ${lastName} ${firstName}`} />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{`${title} ${lastName} ${firstName}`}</h4>
        <p>{email}</p>
        <div className="actions">
          <div className="action">
            { status === STATUS_PASS 
              ? <CancelIcon onClick={() => { onReset(id) }} fontSize="large" alt="cancel" />
              : <ClearIcon onClick={() => { onPass(id) }} fontSize="large" alt="proceed" />
            }
          </div>
          <div className="action">
            { status === STATUS_LIKE 
              ? <FavoriteIcon onClick={() => { onReset(id) }} fontSize="large" alt="cancel" />
              : <FavoriteBorderIcon onClick={() => { onLike(id) }} fontSize="large" alt="proceed" />
            }
          </div>
        </div>
      </div>
    </li>
  )
}