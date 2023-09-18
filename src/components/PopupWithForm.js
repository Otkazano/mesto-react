export default function PopupWithForm (props) {
  return (
    <div
      className={`popup ${props.popupName} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container'>
        <button
          type='button'
          className={`popup__btn-close ${props.popupName}__btn-close`}
          aria-label='Закрыть окно'
          onClick={props.onClose}
        ></button>
        <h3 className='popup__title'>{props.title}</h3>
        <form
          noValidate
          action='#'
          id={props.popupFormName}
          className={`popup__form ${props.popupName}__form`}
          method='POST'
          name={props.popupFormName}
        >
          {props.children}
        </form>
        <button
          type='submit'
          form={props.popupFormName}
          className={`popup__btn-save ${props.popupName}__btn-save`}
          aria-label='Сохранить изменения'
        >
          {props.btnText}
        </button>
      </div>
    </div>
  )
}
