import HttpStatusEventBus from '../../httpStatusEventBus'
import {REQUESTED_MEDIA_NOT_FOUND} from '../index'
import EventBus from '../../../../../bus/event.bus'
function requestedMediaNotFound(){
  HttpStatusEventBus.$on(REQUESTED_MEDIA_NOT_FOUND.toString(),(response)=>{
    let notification_credentials = {
      text: 'resource_not_found',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default requestedMediaNotFound();