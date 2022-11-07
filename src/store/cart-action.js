import { cartActions } from './cart-Slice';
import { uiActions } from './ui-Slice';

//cart-action.js contains all the actions like fetching the data to the backend and send the data to the backend and it is called using useEffect inside the App

export const fetchData=()=>{
    return async(dispatch) => {
        const fetchHandler = async()=>{
            const res = await fetch("https://redux-http-7d26f-default-rtdb.firebaseio.com/cartItems.json")
            const data = res.json()
            return data
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))
        }catch(err){
            dispatch(uiActions.showNotification({
                open:true,
                type:'error',
                message:"Sending Request Failed"
              }))
        }
    }
}

export const sendCartData = (cart) =>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            open:true,
            type:'warning',
            message:"Sending Request"
          }))
        
          const sendRequest = async () => {
            const res = await fetch('https://redux-http-7d26f-default-rtdb.firebaseio.com/cartItems.json', {
              method: "PUT",
              body: JSON.stringify(cart),
            })
            const data = await res.json
            //if successfully sent
            dispatch(uiActions.showNotification({
              open:true,
              type:'success',
              message:"Request Sent"
            }))
          };
          try{
            await sendRequest()
          }catch(err){
            dispatch(uiActions.showNotification({
                open:true,
                type:'error',
                message:"Sending Request Failed"
              }))
          }
    }
}