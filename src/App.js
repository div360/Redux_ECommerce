import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { fetchData,sendCartData } from "./store/cart-action";
let firstRendered = true;
function App() {

  const dispatch = useDispatch();
  const notify = useSelector((state)=>state.ui.notification)
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const cartItems = useSelector((state)=>state.cart.itemsList)
  const cart = useSelector((state)=>state.cart)

  useEffect(()=>{
    dispatch(fetchData())
    //for fetching the data from the backend jisse page reload k baad bhi cart m items show ho
  },[dispatch])

  useEffect(() => {
    if(firstRendered){
      firstRendered=false;
      return;
    }

    //so that it sends the data only when the cart is changed and not loading the page the first time 
    if(cart.changed){
      dispatch(sendCartData(cart));
    }

    //HTTP request using useEffect 

   /* const sendRequest = async () => {
      //sending request notification
      dispatch(uiActions.showNotification({
        open:true,
        type:'warning',
        message:"Sending Request"
      }))
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
    sendRequest().catch((err)=>{
      //send state as error
      dispatch(uiActions.showNotification({
        open:true,
        type:'error',
        message:"Sending Request Failed"
      }))
    });*/

    //HTTP Request using Redux Thunk
  }, [cart,dispatch])
  return (
    <div className="App">
      {notify&&<Notification type={notify.type} message={notify.message}/>}
      {!isLoggedIn && <Auth />}
      {isLoggedIn &&<Layout />}
    </div>
  );
}

export default App;
