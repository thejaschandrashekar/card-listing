import React, { useState } from 'react';
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import { editCard, deleteCard } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import ModalWrapper from './ModalWrapper';

const CardList = ({ cards }) => {
    const dispatch = useDispatch();


    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCardId, setEditCardId] = useState(null);
    const [cardModal, setCardModal] = useState(false);
    const [open, setOpen] = useState('');

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const handleEditCard = (cardId) => {
        setEditModalOpen(true);
        setEditCardId(cardId);
    }

    const handleDeleteCard = (cardId) => {
        dispatch(deleteCard(cardId));
    }

    const handleCardSubmit = (card) => {
        dispatch(editCard(card));
    }

    const handleClick = (cardId, event) => {
        if (event?.target.tagName !== 'IMG') {
            setOpen(cardId);
            setCardModal(true);
          }
    }

    const closeCardModal = () => {
        setCardModal(false);
      };

    return (<>
        <div className='w3-row-padding w3-margin-top'>
            {cards?.sort((a, b) => b.position - a.position)?.map((item, index) => {
                let time = item?.duration;
                let [hour, minute] = time.split(':');
                let formattedTime = hour + 'h ' + minute + ' min';
                return <div className='w3-col s12 m3 l3'
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseLeave={handleMouseOut}
                    onClick={() => handleClick(item.id)}>
                    <div className='card-container'>
                        {hoveredIndex === index && !cardModal && <div className='top-icon'>
                            <img alt='edit'
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEditCard(item.id);
                                  }}
                                src={Edit}
                                width='30px' />
                            <img alt='delete'
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteCard(item.id);
                                  }}
                                src={Delete}
                                width='30px' />
                        </div>}
                        <div className="image-overlay-container">
                            <div className="gradient-overlay" />
                            <img className='card-image' alt="movie-card" src={item.image}
                                width=' 260px'
                                height='180px' />
                        </div>
                        <div className='card-content'>
                            <div className='card-title'>{item?.title}</div>
                            <div className='card-description'>{item?.description}</div>
                            <div className='card-duration'>{formattedTime}</div>
                            <div className='card-genre-container'>
                                {item?.genre && item.genre.map((genre, idx) => (
                                    <div key={idx} className='card-genre'>
                                        {genre} {(item.genre.length > 1 && idx !== item.genre.length - 1) && ' |'} &nbsp;
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            })}
            {editModalOpen && (
                <Modal
                    closeModal={() => setEditModalOpen(false)}
                    handleCardSubmit={handleCardSubmit}
                    editCardId={editCardId}
                    initialFormData={cards.find((card) => card.id === editCardId)}
                />
            )}

            {open && cardModal && (
                <ModalWrapper selectedCardId={open} closeCardModal={closeCardModal} />
            )}

        </div>
    </>
    )
}
export default CardList