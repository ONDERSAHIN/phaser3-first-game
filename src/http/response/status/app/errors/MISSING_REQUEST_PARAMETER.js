import HttpStatusEventBus from '../../httpStatusEventBus'
import {MISSING_REQUEST_PARAMETER} from '../index'
function missing_request_parameter(){
  HttpStatusEventBus.$on(MISSING_REQUEST_PARAMETER.toString(),(response)=>{
    console.error('The payload you have send is not expected size !');
  });
}
export default missing_request_parameter();
