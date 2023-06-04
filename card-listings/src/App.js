import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import Modal from './Component/Modal';
import './App.css'
import CardList from './Component/CardList';


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardData = useSelector((state) => state.cards);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div className="App">
        <button className='add-button w3-button' onClick={openModal}>Add new card</button>
        {isModalOpen && (
          <Modal closeModal={closeModal} />
        )}
        <CardList cards={cardData} />
      </div>
  );
};

export default App;
