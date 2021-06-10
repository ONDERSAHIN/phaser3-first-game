import HttpStatusEventBus from '../httpStatusEventBus'
import {NOT_FOUND} from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'
function notFound(){
  HttpStatusEventBus.$on(NOT_FOUND.toString(),(response)=>{
    let notification_credentials = {
      text: 'resource_is_not_found',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default notFound();
