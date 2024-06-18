const initialState = {
    wishlist: [],
};

const wishlistReducer = (state = initialState.wishlist, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return [...state, action.payload];
        case 'REMOVE_FROM_WISHLIST':
            return state.filter((item) => item.id !== action.payload.id);
        case 'SET_WISHLIST':
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = (state = initialState, action) => {
    return {
        wishlist: wishlistReducer(state.wishlist, action),
    };
};

export default rootReducer;
