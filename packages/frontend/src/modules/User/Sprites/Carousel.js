import React from 'react'
import PropTypes from 'prop-types'
import CarouselSlideItem from './CarouselItem'
import './Carousel.scss'

export default function CarouselContainer ({ users }) {
  const items = fromUsers(users)
  const length = items.length
  items.push(...items)
  const keys = Array.from(Array(items.length).keys())
  return <Carousel items={items} length={length} keys={keys} />
}

const fromUsers = (users) => {
  return users.map((user) => {
    return {
      user
    }
  })
}

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function Carousel ({ items, length, keys }) {
  const [carouselItems, setCarouselItems] = React.useState(keys)
  const [isTicking, setIsTicking] = React.useState(false)
  const [activeIdx, setActiveIdx] = React.useState(0)
  const bigLength = carouselItems.length

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setCarouselItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength])
      })
    }
  }

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true)
      setCarouselItems((prev) => {
        return prev.map(
          (_, i) => prev[(i - jump + bigLength) % bigLength]
        )
      })
    }
  }

  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx)
    if (idx > activeIdx) nextClick(idx - activeIdx)
  }

  React.useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false))
  }, [isTicking])

  React.useEffect(() => {
    setActiveIdx((length - (carouselItems[0] % length)) % length) // prettier-ignore
  }, [carouselItems, length])

  return (
    <div className='carousel__wrap'>
      <div className='carousel__inner'>
        <button className='carousel__btn carousel__btn--prev' onClick={() => prevClick()}>
          <i className='carousel__btn-arrow carousel__btn-arrow--left' />
        </button>
        <div className='carousel__container'>
          <ul className='carousel__slide-list'>
            {carouselItems.map((pos, i) => (
              <CarouselSlideItem
                items={items}
                length={length}
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button className='carousel__btn carousel__btn--next' onClick={() => nextClick()}>
          <i className='carousel__btn-arrow carousel__btn-arrow--right' />
        </button>
        <div className='carousel__dots'>
          {carouselItems.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

CarouselContainer.propTypes = {
  users: PropTypes.array
}

Carousel.propTypes = {
  items: PropTypes.array,
  length: PropTypes.number,
  keys: PropTypes.array
}
