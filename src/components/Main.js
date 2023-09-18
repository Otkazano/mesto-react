import React from 'react'
import api from '../utils/Api.js'
import Card from './Card.js'

export default function Main (props) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCards()])
      .then(([person, cards]) => {
        setUserName(person.name)
        setUserDescription(person.about)
        setUserAvatar(person.avatar)
        setCards(cards)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar'>
          <button
            type='button'
            className='profile__avatar-btn'
            aria-label='Изменить аватар пользователя'
            onClick={props.onEditAvatar}
          ></button>
          <img
            className='profile__avatar-img'
            src={userAvatar}
            alt='Аватар пользователя'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__person'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              type='button'
              className='profile__btn-edit'
              aria-label='Изменить данные профиля'
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className='profile__about'>{userDescription}</p>
        </div>
        <button
          type='button'
          className='profile__btn-add'
          aria-label='Добавить фотокарточку в ленту'
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className='gallery' aria-label='Фото-галерея'>
        {cards.map(item => (
          <Card
            item={item}
            onDeleteClick={props.onDelete}
            onCardClick={props.onCardClick}
            key={item._id}
          />
        ))}{' '}
      </section>
    </main>
  )
}
