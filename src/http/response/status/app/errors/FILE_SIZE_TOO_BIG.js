import HttpStatusEventBus from '../../httpStatusEventBus'
import {FILE_SIZE_TOO_BIG} from '../index'
import EventBus from '../../../../../bus/event.bus'
function fileSizeTooBig(){
  HttpStatusEventBus.$on(FILE_SIZE_TOO_BIG.toString(),(response)=>{
    let notification_credentials = {
      text: 'less_than_2_mb_error',
      color: 'error',
      type:'error'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  });
}
export default fileSizeTooBig();
