import React from 'react'
import '../index.css'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'

export default function App () {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isAgreePopupOpen, setIsAgreePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCards()])
      .then(([person, cards]) => {
        setCurrentUser(person)
        setCards(cards)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    if (isLiked) {
      api.dislikeCard(card._id).then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
    } else {
      api.likeCard(card._id).then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
    }
  }

  function handleAgreeCardDelete () {
    const id = selectedCard._id
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== id))
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setSelectedCard({})
      })
  }

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

  function handleDeleteClick (data) {
    setSelectedCard(data)
    setIsAgreePopupOpen(true)
  }

  function closeAllPopup () {
    setIsImagePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsAgreePopupOpen(false)
  }

  function handleAddPlaceSubmit ({ name, link }) {
    api
      .createCard({ nameNewImage: name, linkNewImage: link })
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateUser ({ name, about }) {
    const avatar = currentUser.avatar
    const id = currentUser._id
    const cohort = currentUser.cohort
    api
      .saveUserChanges({ nameProfile: name, aboutProfile: about })
      .then(() => {
        setCurrentUser({ name, about, avatar, _id: id, cohort })
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateAvatar ({ avatar }) {
    const name = currentUser.name
    const about = currentUser.about
    const id = currentUser._id
    const cohort = currentUser.cohort
    api
      .changeUserAvatar(avatar)
      .then(() => {
        setCurrentUser({ name, about, avatar, _id: id, cohort })
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onDelete={handleDeleteClick}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLike}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isAgreePopupOpen}
          onClose={closeAllPopup}
          onDelete={handleAgreeCardDelete}
        />

        <ImagePopup
          onClose={closeAllPopup}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}
