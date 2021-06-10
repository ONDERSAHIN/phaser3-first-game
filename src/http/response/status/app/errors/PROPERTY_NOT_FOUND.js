import HttpStatusEventBus from '../../httpStatusEventBus'
import {PROPERTY_NOT_FOUND} from '../index'
function property_not_found(){
  HttpStatusEventBus.$on(PROPERTY_NOT_FOUND.toString(),(response)=>{
    console.error('Property is not found');
  });
}
export default property_not_found();
