import React from 'react'
import '../index.css'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

export default function App () {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isAgreePopupOpen, setIsAgreePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfileOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (data) {
    setIsImagePopupOpen(true)
    setSelectedCard(data)
  }

  function handleDeleteClick () {
    setIsAgreePopupOpen(true)
  }

  function closeAllPopup () {
    setIsImagePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsAgreePopupOpen(false)
  }

  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onDelete={handleDeleteClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        popupName='popup-profile'
        title='Редактировать профиль'
        popupFormName='profile-form'
        btnText='Сохранить'
        isOpen={isEditProfileOpen}
        onClose={closeAllPopup}
      >
        <input
          type='text'
          id='nameProfile'
          name='nameProfile'
          className='popup__input popup__input_el_name-profile'
          required
          placeholder='Имя'
          autoComplete='off'
          minLength='2'
          maxLength='40'
        />
        <span className='popup__error-message' id='error-nameProfile'></span>
        <input
          type='text'
          id='aboutProfile'
          name='aboutProfile'
          className='popup__input popup__input_el_about-profile'
          required
          placeholder='О себе'
          autoComplete='off'
          minLength='2'
          maxLength='200'
        />
        <span className='popup__error-message' id='error-aboutProfile'></span>
      </PopupWithForm>

      <PopupWithForm
        popupName='popup-newImage'
        title='Новое место'
        popupFormName='newImage-form'
        btnText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
      >
        <input
          type='text'
          id='nameNewImage'
          name='nameNewImage'
          className='popup__input popup__input_el_name-newImage'
          required
          placeholder='Название'
          autoComplete='off'
          minLength='2'
          maxLength='30'
        />
        <span className='popup__error-message' id='error-nameNewImage'></span>
        <input
          type='url'
          id='linkNewImage'
          name='linkNewImage'
          className='popup__input popup__input_el_link-newImage'
          required
          placeholder='Ссылка на картинку'
          autoComplete='off'
        />
        <span className='popup__error-message' id='error-linkNewImage'></span>
      </PopupWithForm>

      <PopupWithForm
        popupName='popup-newAvatar'
        title='Обновить аватар'
        popupFormName='newAvatar-form'
        btnText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      >
        <input
          type='url'
          id='linkNewAvatar'
          name='linkNewAvatar'
          className='popup__input popup__input_el_link-newAvatar'
          required
          placeholder='Ссылка на картинку'
          autoComplete='off'
        />
        <span className='popup__error-message' id='error-linkNewAvatar'></span>
      </PopupWithForm>

      <PopupWithForm
        popupName='popup-agreeDelete'
        title='Вы уверены?'
        popupFormName='agreeDelete-form'
        btnText='Да'
        isOpen={isAgreePopupOpen}
        onClose={closeAllPopup}
      />

      <ImagePopup
        onClose={closeAllPopup}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />
    </div>
  )
}
