import HttpStatusEventBus from '../../httpStatusEventBus'
import {HTTP_MESSAGE_NOT_WRITABLE} from '../index'
function http_message_not_writable(){
  HttpStatusEventBus.$on(HTTP_MESSAGE_NOT_WRITABLE.toString(),(response)=>{
    console.error('Server side error : ' + HTTP_MESSAGE_NOT_WRITABLE.toString());
  });
}
export default http_message_not_writable();
