export const initialState = {
  cart: [],
  total: "0.00",
};

export const actionType = {
  SET_CART: "SET_CART",
  SET_TOTAL: "SET_TOTAL",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_CART:
      return {
        ...state,
        cart: action.cart,
      };

    case actionType.SET_TOTAL:
      return {
        ...state,
        total: parseFloat(action.total),
      };

    default:
      return state;
  }
};

export default reducer;