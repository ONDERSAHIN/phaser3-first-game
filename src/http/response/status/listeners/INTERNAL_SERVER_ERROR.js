import HttpStatusEventBus from '../httpStatusEventBus'
import {INTERNAL_SERVER_ERROR} from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'
function internalServerError(){
  HttpStatusEventBus.$on(INTERNAL_SERVER_ERROR.toString(),(response)=>{
    let notification_credentials = {
      text: 'server_error',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default internalServerError();
