export default function PopupWithForm ({popupName, isOpen, onClose, title, popupFormName, children, btnText, onSubmit}) {
  return (
    <div
      className={`popup ${popupName} ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container'>
        <button
          type='button'
          className={`popup__btn-close ${popupName}__btn-close`}
          aria-label='Закрыть окно'
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        <form
          noValidate
          action='#'
          id={popupFormName}
          className={`popup__form ${popupName}__form`}
          method='POST'
          name={popupFormName}
          onSubmit={onSubmit}
        >
          {children}
        </form>
        <button
          type='submit'
          form={popupFormName}
          className={`popup__btn-save ${popupName}__btn-save`}
          aria-label='Сохранить изменения'
        >
          {btnText}
        </button>
      </div>
    </div>
  )
}
