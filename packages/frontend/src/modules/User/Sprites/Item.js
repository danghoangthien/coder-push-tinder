import React from 'react'
import PropTypes from 'prop-types'

// thirdparty
import CancelIcon from '@material-ui/icons/Cancel'
import ClearIcon from '@material-ui/icons/Clear'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Tooltip from '@material-ui/core/Tooltip'

import { calculateAge } from '@/common/utils'
import { getUser, reactUser } from '@/services/user'

const REACTIONS = {
  LIKE: 'like',
  PASS: 'pass'
}

const ERRORS = {
  REACTION: 'reaction',
  GET_USER: 'get_user'
}

const getUserFromService = async(user) => {
  let error, fullUser
  try {
    const result = await getUser(user.id)
    fullUser = {
      ...result.data.data.user,
      ...user,
      interaction: result.data.data.currentUserInteraction || null
    }
  } catch (err) {
    error = {
      type: ERRORS.GET_USER,
      err
    }
  }
  return [error, fullUser]
}

const reactUserFromService = async(id, type) => {
  let error, interaction
  try {
    const result = await reactUser(id, type)
    interaction = result.data.data
  } catch (err) {
    error = {
      type: ERRORS.REACTION,
      err
    }
  }
  console.log([error, interaction])
  return [error, interaction]
}

export default function Item({ user, itemLoaded, setItemLoaded }) {
  const [error, setError] = React.useState(null)
  const [fullUser, setFullUser] = React.useState(null)
  const [reaction, setReaction] = React.useState(null)

  React.useEffect(() => {
    (async() => {
      setItemLoaded(false)
      setError(null)
      setReaction(null)
      const [error, fullUser] = await getUserFromService(user)
      if (error) {
        setError(error)
      }
      if (fullUser) {
        setFullUser(fullUser)
        const { interaction } = fullUser
        if (interaction) {
          setReaction(interaction.reaction)
        }
      }
      setItemLoaded(true)
    })()
  }, [user])

  const onReactUser = async(id, reactType) => {
    const [error, interaction] = await reactUserFromService(id, reactType)
    console.log('[error, interaction]', error, interaction)
    if (error) {
      setError(error)
    }
    if (interaction) {
      setReaction(interaction.reaction)
    }
  }

  const onPass = (id) => {
    onReactUser(id, REACTIONS.PASS)
  }

  const onLike = (id) => {
    onReactUser(id, REACTIONS.LIKE)
  }

  if (!fullUser) return null

  const {
    picture,
    firstName,
    id,
    email,
    dateOfBirth
  } = fullUser

  const age = calculateAge(dateOfBirth)

  return (
    <>
      {
        !error ? (
          <>
            <div className='cover-photo'>
              {itemLoaded && (
                <img className='profile' src={picture} alt={`${firstName}`} />
              )}
            </div>
            <div className='profile-name'>{`${firstName} ${age}`}</div>
            <p className='about'>
              Mail: {email}
            </p>
            <div className='actions'>
              <div className='action'>
                { reaction === REACTIONS.PASS
                  ? (
                    <CancelIcon fontSize='large' alt='passed' />
                  )
                  : (
                    <Tooltip enterDelay={500} placement='top-end' title={<h2>{`${REACTIONS.PASS} ${firstName}`}</h2>} aria-label='pass' arrow>
                      <ClearIcon onClick={() => { onPass(id) }} fontSize='large' alt='proceed' />
                    </Tooltip>
                  )
                }
              </div>
              <div className='action'>
                { reaction === REACTIONS.LIKE
                  ? (
                    <FavoriteIcon fontSize='large' alt='liked' />
                  )
                  : (
                    <Tooltip enterDelay={500} placement='top-start' title={<h2>{`${REACTIONS.LIKE} ${firstName}`}</h2>} aria-label='like' arrow>
                      <FavoriteBorderIcon onClick={() => { onLike(id) }} fontSize='large' alt='proceed' />
                    </Tooltip>
                  )
                }
              </div>
            </div>
          </>
        ) : (
          <div>
            { error.type === ERRORS.GET_USER && 'There is an error while fetching this user' }
          </div>
        )
      }
    </>
  )
}

Item.propTypes = {
  user: PropTypes.object,
  itemLoaded: PropTypes.bool,
  setItemLoaded: PropTypes.func
}
