import HttpStatusEventBus from '../httpStatusEventBus'
import { CREATED } from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'
export default (function(){
  HttpStatusEventBus.$on(CREATED.toString(),(response)=>{
    let notification_credentials = {
      text: 'saved_successfully',
      color: 'success',
      type:'success'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
})()
