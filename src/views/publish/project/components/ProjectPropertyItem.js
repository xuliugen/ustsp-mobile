import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { EvilIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

class ProjectPropertyItem extends React.Component {
  state = {
    value: this.props.item.value !== null ? this.props.item.value : '',
    showCalendar: false
  }

  onItemPress = () => {
    if (this.props.item.type === 'select_date') {
      this.setState({ showCalendar: true })
    } else {
      this.props.navigation.navigate('ProjectContentSetting', {
        callback: (item) => {
          this.setState({value: item.value})
          this.props.propertyValueCallback(item)
        },
        item: this.props.item
      })
    }
  }

  showDateTimePicker = () => this.setState({ showCalendar: true })

  hideDateTimePicker = () => this.setState({ showCalendar: false })

  handleDatePicked = (date) => {
    this.hideDateTimePicker()
    this.setState({value: moment(date).format('YYYY-MM-DD')})
    let item = this.props.item
    item.value = moment(date).unix() * 1000
    this.props.propertyValueCallback(item)
  }

  render() {
    let valueStr = this.state.value.toString()
    return (
      <TouchableOpacity style={styles.container} onPress={this.onItemPress}>
        <View style={styles.propertyNameContainer}>
          {this.props.item.isMust ? <Text style={styles.mustSign}>*</Text> : null}
          <Text style={styles.name}>{this.props.item.name != null ? this.props.item.name : ''}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.content}>{valueStr.length > 10 ? valueStr.substr(0, 10) + '...' : valueStr }</Text>
          <EvilIcons
            name={'chevron-right'}
            color={'#8d9ca7'}
            size={30}
            style={styles.rightArrow} />
        </View>
        <DateTimePicker
          isVisible={this.state.showCalendar}
          cancelTextIOS={'取消'}
          confirmTextIOS={'确定'}
          titleIOS={'选择日期'}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(ProjectPropertyItem)

const styles = StyleSheet.create({
  container: {
    paddingLeft: px2dp(30),
    height: px2dp(88),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  name: {
    color: 'black',
    fontSize: px2sp(30)
  },
  content: {
    color: '#666',
    fontSize: px2sp(25),
    marginTop: px2dp(-2),
    marginRight: px2dp(-20)
  },
  rightArrow: {
    marginRight: px2dp(-20)
  },
  valueContainer: {
    position: 'absolute',
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mustSign: {
    color: '#8f9ba7',
    paddingTop: px2dp(10)
  },
  propertyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
