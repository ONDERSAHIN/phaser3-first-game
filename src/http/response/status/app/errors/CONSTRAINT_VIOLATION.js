import HttpStatusEventBus from '../../httpStatusEventBus'
import {CONSTRAINT_VIOLATION} from '../index'
import EventBus from '../../../../../bus/event.bus'

function constraint_violation() {
    HttpStatusEventBus.$on(CONSTRAINT_VIOLATION.toString(), (response) => {
        let notification_credentials = {
            text: 'constraint_violation',
            color: 'error',
            type: 'error'
        };
        EventBus.$emit('snack-bar-notification', notification_credentials)
    });
}

export default constraint_violation();
