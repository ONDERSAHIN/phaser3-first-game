import HttpStatusEventBus from '../httpStatusEventBus'
import { NO_CONTENT } from 'http-status-codes'
import EventBus from '../../../../bus/event.bus'

function noContent () {
  HttpStatusEventBus.$on(NO_CONTENT.toString(), (response) => {
    let notification_credentials = {
      text: 'deleted_successfully',
      color: 'success',
      type:'success'
    }
    EventBus.$emit('snack-bar-notification', notification_credentials)
  })
}

export default noContent()
