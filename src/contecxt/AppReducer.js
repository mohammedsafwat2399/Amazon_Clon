   export const getBasketTotal=(basket)=>
      basket.reduce((amount, item)=>{
        return amount + item.price;
      }, 0)
   
   
   export const initialState = {
    user:null,
    basket:[],
}
const AppReducer = (state =initialState , action ) => {
  switch(action.type) {
    case "SET_USER":
        return {
            ...state,
            user: action.user,
        };
        case "APP_TO_BASKET":
          return{
            ...state,
            basket:[...state.basket ,action.item ]
          };
          case "EMPTY_BASKET":
            return {
              ...state,
              basket:[],
            }

          case "REMOVE_FROM_BASKET":
            //4
            const index =state.basket.findIndex((itemId) => itemId.id === action.id)
            //3
            let newBasket =[...state.basket]
            //5 
            if(index >=0){
              newBasket.splice(index, 1)
            }else{
              console.warn(`can not remove product {id ${action.id} as it is not in basket}`)
            }
            return{
              //1
              ...state,
              //2
              basket: newBasket
            };
        default: 
        return state;
  }
}

export default AppReducer