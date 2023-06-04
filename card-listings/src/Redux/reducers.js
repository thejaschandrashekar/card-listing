import { ADD_CARD, DELETE_CARD, EDIT_CARD } from './actions';

const initialState = {
  cards: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload],
            };
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter((card) => card.id !== action.payload),
            };

        case EDIT_CARD:
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card.id === action.payload.id ? action.payload : card
                ),
            };
        default:
            return state;
    }
};

export default rootReducer;