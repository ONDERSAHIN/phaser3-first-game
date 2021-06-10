import HttpStatusEventBus from '../../httpStatusEventBus'
import {ENTITY_NOT_FOUND} from '../index'
import EventBus from '../../../../../bus/event.bus'
function entity_not_found(){
  HttpStatusEventBus.$on(ENTITY_NOT_FOUND.toString(),(response)=>{
    let notification_credentials = {
      text: 'entity_not_found',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default entity_not_found();
