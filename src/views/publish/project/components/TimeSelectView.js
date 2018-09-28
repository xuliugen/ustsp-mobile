import React from 'react'
import {
  View
} from 'react-native'
// import moment from 'moment'
// import { withNavigation } from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class DateTimePickerTester extends React.Component {
  state = {
    isDateTimePickerVisible: this.props.showCalendar
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this._hideDateTimePicker()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }
}
