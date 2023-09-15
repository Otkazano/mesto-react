export default function Card({item, popupDeleteOpen, onCardClick}) {

  function handleClick() {
    onCardClick({item});
  }

  return (
    <div className="gallery__item">
      <img src={
          item.link
        }
        alt="#"
        className="gallery__photo"
        onClick={handleClick}/>
      <div className="gallery__info">
        <h2 className="gallery__location">
          {
          item.name
        }</h2>
        <div className="gallery__likes">
          <button type="button" className="gallery__likes-icon gallery__btn-like" aria-label="Отметить фотокарточку лайком"></button>
          <p className="gallery__likes-quantity">
            {
            item.likes.length
          }</p>
        </div>
      </div>
      <button type="button" className="gallery__delete" aria-label="Удалить фотокарточку" onClick={popupDeleteOpen}></button>
    </div>
  )
}