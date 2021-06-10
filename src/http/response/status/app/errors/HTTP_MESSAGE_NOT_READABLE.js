import HttpStatusEventBus from '../../httpStatusEventBus'
import {HTTP_MESSAGE_NOT_READABLE} from '../index'
function http_message_not_readable(){
  HttpStatusEventBus.$on(HTTP_MESSAGE_NOT_READABLE.toString(),(response)=>{
    console.error('Json malformed : ' + HTTP_MESSAGE_NOT_READABLE.toString());
  });
}
export default http_message_not_readable();
