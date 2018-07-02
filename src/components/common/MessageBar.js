import { MessageBarManager } from 'react-native-message-bar'
import { STATUS_BAR_HEIGHT } from 'src/utils/device'

export default {
  show: function(options) {
    if (typeof options !== 'object') {
      throw new Error('Expected `options` to be object.')
    }

    if (!options) {
      throw new Error('`options` is required.')
    }

    let { message, type = 'success' } = options

    MessageBarManager.showAlert({
      // Both 80 and 60 should same with variables in `_Header.js`.
      viewTopOffset: STATUS_BAR_HEIGHT,
      message,
      alertType: type,
      messageStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
      },
      // change default background color for success message bar
      stylesheetSuccess: {
        backgroundColor: '#4cba7f',
        strokeColor: '#4cba7f'
      }
    })
  }
}
