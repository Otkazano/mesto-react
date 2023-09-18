export default function Card ({ item, onDeleteClick, onCardClick }) {
  function handleClick () {
    onCardClick(item)
  }

  return (
    <div className='gallery__item'>
      <img
        src={item.link}
        alt={`Достопромечательность из ${item.name}`}
        className='gallery__photo'
        onClick={handleClick}
      />
      <div className='gallery__info'>
        <h2 className='gallery__location'>{item.name}</h2>
        <div className='gallery__likes'>
          <button
            type='button'
            className='gallery__likes-icon gallery__btn-like'
            aria-label='Отметить фотокарточку лайком'
          />
          <p className='gallery__likes-quantity'>{item.likes.length}</p>
        </div>
      </div>
      <button
        type='button'
        className='gallery__delete'
        aria-label='Удалить фотокарточку'
        onClick={onDeleteClick}
      />
    </div>
  )
}
