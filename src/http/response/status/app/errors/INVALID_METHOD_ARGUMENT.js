import HttpStatusEventBus from '../../httpStatusEventBus'
import {INVALID_METHOD_ARGUMENT} from '../index'
import EventBus from '../../../../../bus/event.bus'
function invalid_method_arguament(){
  HttpStatusEventBus.$on(INVALID_METHOD_ARGUMENT.toString(),(response)=>{
    console.error('Invalid method argument.The validation rules are exceeded!');
    let notification_credentials = {
      text: 'invalid_method_argument',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default invalid_method_arguament();
