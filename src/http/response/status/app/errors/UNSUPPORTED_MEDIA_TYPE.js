import HttpStatusEventBus from '../../httpStatusEventBus'
import {UNSUPPORTED_MEDIA_TYPE} from '../index'
function unsupported_media_type(){
  HttpStatusEventBus.$on(UNSUPPORTED_MEDIA_TYPE.toString(),(response)=>{
    console.error('Invalid json');
  });
}
export default unsupported_media_type();
