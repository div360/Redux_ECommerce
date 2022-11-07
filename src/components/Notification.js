import React from 'react'
import {Alert} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import { uiActions } from '../store/ui-Slice'
const Notification = ({type, message}) => {
    const dispatch = useDispatch();
    const notify = useSelector((state)=>state.ui.notification)
    const handleClose=()=>{
        dispatch(uiActions.showNotification({
            open:false
        }))
    }
  return (
    <div>
      {notify.open && <Alert severity={type}>{message}</Alert>}
    </div>
  )
}

export default Notification
