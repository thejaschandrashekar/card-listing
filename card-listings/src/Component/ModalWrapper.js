import React from 'react';
import { useSelector } from 'react-redux';

const ModalWrapper = ({ selectedCardId, closeCardModal }) => {
    const cardData = useSelector((state) => state.cards);
    const selectedCard = cardData?.filter((item) => (
        item.id === selectedCardId
    ))

    return (
        <div className="w3-modal modal">
            <div className="w3-modal-content card-modal-content">
                <div className="w3-container">
                    <div style={{display: 'flex', justifyContent:'flex-end', cursor:'pointer'}}>
                    <div onClick={closeCardModal}>X</div>
                    </div>
                    {selectedCard?.map((item) => {
                        let time = item?.duration;
                        let [hour, minute] = time.split(':');
                        let formattedTime = hour + 'h ' + minute + ' min';
                        return <>
                            <div className="image-overlay-container">
                                <div className="card-gradient-overlay" />
                                <img className='card-image-modal' alt="movie-card" src={item.image} />
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
                        </>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ModalWrapper;
