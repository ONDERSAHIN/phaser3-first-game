import HttpStatusEventBus from '../httpStatusEventBus'
import EventBus from '../../../../bus/event.bus'

function internetOffline () {
  HttpStatusEventBus.$on('5000', (response) => {
    let notification_credentials = {
      text: 'network_error',
      color: 'error',
      type: 'error',
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  })
}

export default internetOffline()