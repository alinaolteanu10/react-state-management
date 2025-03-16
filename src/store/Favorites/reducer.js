
export const initialState = {
  products: []
};

export function favReducer(state, action){
  switch(action.type) {
      case "ADD_TO_FAV": {
          const foundProduct = state.products.find((product) => {
              return product.id === action.payload.id;
            });
            if (foundProduct) {
              return state;
          } else {
              return{
                  products: [...state.products, action.payload]
              };
          }
      }
      case "REMOVE_FROM_FAV": {
          const filteredProducts = state.products.filter((product) => {
              return product.id !== action.payload;
          });
          return {
              products: filteredProducts
          };
      }
      default:
           return state;
  }
}