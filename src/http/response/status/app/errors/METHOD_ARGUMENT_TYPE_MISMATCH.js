import HttpStatusEventBus from '../../httpStatusEventBus'
import {METHOD_ARGUMENT_TYPE_MISMATCH} from '../index'
function method_argument_type_mismatch(){
  HttpStatusEventBus.$on(METHOD_ARGUMENT_TYPE_MISMATCH.toString(),(response)=>{
    console.error('Method arguments are not expected data type!');
  });
}
export default method_argument_type_mismatch();
