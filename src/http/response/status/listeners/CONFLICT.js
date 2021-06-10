import HttpStatusEventBus from '../httpStatusEventBus'
import {CONFLICT} from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'
export default function(){
  HttpStatusEventBus.$on(CONFLICT.toString(),(response)=>{
    let notification_credentials = {
      text: 'same_record_exist',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
