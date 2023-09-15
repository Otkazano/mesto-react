export default function ImagePopup(props) {
  return (
    <div className={`popup popup-image popup_theme_dark ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button type="button" className="popup__btn-close popup-image__btn-close" aria-label="Закрыть окно увеличенной фотокарточки" onClick={props.onClose}></button>
        <img src={props.card.link} alt="#" className="popup-image__img"/>
        <p className="popup-image__about">{props.card.name}</p>
      </div>
    </div>
  )
}
