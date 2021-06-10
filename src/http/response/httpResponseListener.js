import HttpStatusEventBus from './status/httpStatusEventBus'
import { httpEventBus } from '../event/httpEventBus'

function http_response_listener () {
  httpEventBus.$on('http-response', (response) => {
    let response_status = response.status.toString();
    if(response.status && response.status === 200 && response.data && response.data.error){
        response_status = response.data.error.code.toString();
    }
    HttpStatusEventBus.$emit(response_status, response)
  })
}
export default http_response_listener()
