export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_CARD = 'EDIT_CARD';

export const addCard = (card) => ({
  type: ADD_CARD,
  payload: card,
});

export const deleteCard = (cardId) => ({
  type: DELETE_CARD,
  payload: cardId,
});

export const editCard = (card) => ({
    type: EDIT_CARD,
    payload: card,
});
