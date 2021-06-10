import HttpStatusEventBus from '../httpStatusEventBus'
import {NOT_MODIFIED} from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'
function notModified(){
  HttpStatusEventBus.$on(NOT_MODIFIED.toString(),(response)=>{
    let notification_credentials = {
      text: 'this_record_is_not_available',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
    
  });
}
export default notModified();
