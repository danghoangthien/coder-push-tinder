import React from 'react'
import './Carousel.scss'

const slideWidth = 30

export default function _ ({ users }) {
  const items = fromUsers(users)
  const length = items.length
  items.push(...items)
  const keys = Array.from(Array(items.length).keys())
  console.log('keys',keys)
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

const CarouselSlideItem = ({items, length, pos, idx, activeIdx}) => {
    const item = createItem(items, length, pos, idx, activeIdx)
    const {
        user: { 
          title,
          picture,
          firstName,
          lastName,
          id,
          email
        }
    } = item 
    return (
        <li key={id} className="carousel__slide-item" style={item.styles}>
            <div className="carousel__slide-item-img-link">
                <img src={picture} alt={`${title} ${lastName} ${firstName}`} />
            </div>
            <div className="carousel-slide-item__body">
                <h4>{`${title} ${lastName} ${firstName}`}</h4>
                <p>{email}</p>
            </div>
        </li>
    )
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
                    (_, i) => prev[(i - jump + bigLength) % bigLength],
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
        <div className="carousel__wrap">
            <div className="carousel__inner">
                <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                </button>
                <div className="carousel__container">
                    <ul className="carousel__slide-list">
                        {carouselItems.map((pos, i) => (
                            <CarouselSlideItem
                                items = {items}
                                length = {length}
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                </button>
                <div className="carousel__dots">
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
