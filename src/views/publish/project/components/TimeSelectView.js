import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import moment from 'moment'
import { withNavigation } from 'react-navigation'
import Calendar from 'react-native-calendar-select'

class TimeSelectView extends React.Component {
  state = {
    startDate: moment(),
    endDate: null
  }

  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    })
  }

  openCalendar() {
    this.calendar && this.calendar.open()
  }

  render() {
    let customI18n = {
      'w': ['', '一', '二', '三', '四', '五', '六', '七'],
      'weekday': ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      'text': {
        'start': '起始时间',
        'end': '结束时间',
        'date': '请选择',
        'save': '确认',
        'clear': '重新选择'
      },
      'date': 'YY.MM.DD' // date format
    }
    // optional property, too.
    let color = {
      subColor: '#f0f0f0'
    }
    if (this.props.showCalendar) {
      this.openCalendar()
    }
    return (
      <View style={styles.container}>
        <Calendar
          i18n="zh"
          ref={(calendar) => { this.calendar = calendar }}
          customI18n={customI18n}
          color={color}
          format="YYYYMM"
          minDate={moment(moment().subtract(1, 'y')).format('YYYYMMDD')}
          maxDate={moment(moment().add(5, 'y')).format('YYYYMMDD')}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate.bind(this)}
        />
      </View>
    )
  }
}

export default withNavigation(TimeSelectView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F5'
  }
})
