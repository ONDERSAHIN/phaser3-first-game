import HttpStatusEventBus from '../httpStatusEventBus'
import {OK} from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'

function ok() {
    HttpStatusEventBus.$on(OK.toString(), (response) => {
        if(response.config.url.includes("/start")) return; // TODO : will be changed ACCEPTED
        let notification_credentials;
        if (response.config && response.config.method === 'post') {
            notification_credentials = {
                text: 'success',
                color: 'success',
                type: 'success'
            }
        }

        if (response.config && response.config.method === 'put') {
            notification_credentials = {
                text: 'updated_successfully',
                color: 'success',
                type: 'success'
            }
        }
        EventBus.$emit('snack-bar-notification', notification_credentials)
    })
}

export default ok()
