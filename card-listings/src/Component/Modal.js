import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {editCard, addCard} from '../Redux/actions'


const Modal = ({ closeModal, editCardId = ''}) => {
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.cards);
    const initialForm = {
        title: '',
        description: '',
        duration: '',
        genre: '',
        image: '',
        id: ''
    }
    const [form, setForm] = useState(initialForm);
    const [selectedFile, setSelectedFile] = useState();
    const [image, setImage] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState([]);

    const uniqueId = uuidv4();

    useEffect(() => {
        if (editCardId) {
            const card = cardData.find((card) => card.id === editCardId);
            if (card) {
                setForm({
                    title: card.title,
                    description: card.description,
                    duration: card.duration,
                    genre: card.genre,
                    image: card.image,
                    id: card.id,
                    position: card.position
                });
                setImage()
                setSelectedGenre(card.genre ? card.genre : []);
            }
        }
    }, [editCardId, cardData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const card = {
            id: form.id || uniqueId,
            title: form.title,
            description: form.description,
            duration: form.duration,
            genre: selectedGenre ? selectedGenre : '',
            selectedFile: selectedFile ? selectedFile : '',
            image: image ? image : form.image,
            position: form.position || cardData?.length
        };

        if(editCardId) {
            dispatch(editCard(card));
        } else {
            dispatch(addCard(card));
        }
        closeModal();
        setForm(initialForm);
        setSelectedFile(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const data = Object.assign({}, form);
        data[name] = value;
        setForm(data);

    };

    const handleImageUpload = (e) => {
        setSelectedFile(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleGenre = (selectedOption) => {
        let genre = null
        selectedOption?.forEach(item => (
            genre = item.label
        ))
        setSelectedGenre([...selectedGenre, genre])

    }

    const genreValue = [
        { value: 'Action', label: 'Action' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Drama', label: 'Drama' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Thriller', label: 'Thriller' }
    ]

    return (
        <div className="w3-modal modal">
            <div className="w3-modal-content modal-content">
                <div className="w3-container">
                    <button onClick={closeModal} className="w3-right">X</button>
                    <h2>Modal Content</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={form.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>
                                Description
                            </label>
                            <textarea className='form-textarea'
                             onChange={handleChange} 
                             name="description" 
                             required
                             rows={4} cols={40}
                             value={form.description} />
                        </div>

                        <div>
                            <label>
                                Duration
                            </label>
                            <input type="time"
                                id="duration"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                required></input>
                        </div>

                        <div>
                            <label>
                                Genre
                            </label>
                            <Select
                                className='form-select'
                                isMulti
                                name="genre"
                                options={genreValue}
                                required
                                defaultValue={selectedGenre?.map((genre) => ({ value: genre, label: genre }))}
                                onChange={handleGenre}
                            />
                        </div>

                        <div>
                            <label>Image</label>
                            <input type="file" name="image" required accept="image/png, image/jpg" onChange={handleImageUpload} />
                        </div>


                        <button type="submit">Add Card</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Modal;
