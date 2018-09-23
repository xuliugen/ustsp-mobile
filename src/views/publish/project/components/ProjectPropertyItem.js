
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { EvilIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
// import Picker from 'react-native-picker'

/**
 * @todo 时间城市选择器 Picker
 */

class ProjectPropertyItem extends React.Component {
  state = {
    value: this.props.item.value !== null ? this.props.item.value : ''
  }

  onItemPress = () => {
    if (this.props.item.type === 'SLECT_DATE') {
      this.picker.toggle()
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

  createDateData = () => {
    let date = {}
    for (let i = 1950; i < 2050; i++) {
      let month = {}
      for (let j = 1; j < 13; j++) {
        let day = []
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k + '日')
          }
        } else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
          for (let k = 1; k < 32; k++) {
            day.push(k + '日')
          }
        } else {
          for (let k = 1; k < 31; k++) {
            day.push(k + '日')
          }
        }
        month[j + '月'] = day
      }
      date[i + '年'] = month
    }
    return date
  };

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
        {/* <Picker
          ref={(picker) => { this.picker = picker }}
          style={{ height: 320 }}
          showDuration={300}
          pickerData={this.createDateData()}
          selectedValue={['2015年', '12月', '12日']}
          onPickerDone={(pickedValue) => {
          }}
        /> */}
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
