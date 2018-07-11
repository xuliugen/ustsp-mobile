import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import { px2dp, px2sp } from 'src/utils/device'
import { setSearchPayload } from 'src/actions'

const mapStateToProps = state => ({
  talent: state.search.talentPl,
  project: state.search.projectPl
})

@connect(mapStateToProps)
export default class SelectorBlock extends React.Component {
  constructor(props) {
    super(props)
    this.processData(props.data)
    this.state = {
      expanded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.processData(nextProps.data)
  }

  processData(data) {
    // 将一维数组 format 为 Mx3（M行3列）的二维数组(更好的写法？)
    // why: 方便在条件框固定显示每列3个条件（有更好的实现思路？）
    this._2dData = data.reduce((pre, cur, idx) => {
      if (idx % 3 === 0) {
        pre[`${idx / 3}`] = [cur]
        return pre
      } else {
        return pre.map((i, iidx) => {
          if (iidx === pre.length - 1) {
            return i.concat(cur)
          } else {
            return i
          }
        })
      }
    }, [])
  }

  handleExpandIconPress = () => {
    this.setState(pre => ({
      expanded: !pre.expanded
    }))
  }
  handleSelectPress = (value, valueSelected) => {
    if (value === valueSelected) {
      return
    }
    const _value = value === '不限' ? '' : value
    const { field, scope } = this.props
    this.props.dispatch(setSearchPayload(scope, field, _value))

    // 人才筛选时，选择省份时重置大学
    if (scope === 'talent' && field === 'province') {
      this.props.dispatch(setSearchPayload(scope, 'school', ''))
    }
  }

  getSelectorStyle(value, valueSelected) {
    if (value === valueSelected || (value === '不限' && valueSelected === '')) {
      return StyleSheet.flatten([styles.selector, styles.selectorChecked])
    } else {
      return styles.selector
    }
  }
  getSelectorTextStyle(value, valueSelected) {
    if (value === valueSelected || (value === '不限' && valueSelected === '')) {
      return StyleSheet.flatten([styles.selectorText, styles.selectorTextChecked])
    } else {
      return styles.selectorText
    }
  }

  render() {
    const _2dDataResolved = (this.state.expanded || this._2dData.length <= 3) ? this._2dData : this._2dData.slice(0, 3)
    const { field, scope } = this.props
    const _value = this.props[scope][field]
    return (
      <View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{this.props.label}</Text>
          {this._2dData.length > 3 && <Ionicons
            name={`ios-arrow-${this.state.expanded ? 'up' : 'down'}`}
            onPress={this.handleExpandIconPress}
            style={styles.expandIcon} />}
        </View>
        <View style={styles.selectorsContainer}>
          {_2dDataResolved.map((column, idx) => (
            <View style={styles.selectorsColumn} key={`line${idx}`}>
              {column.map((value) => (
                <TouchableOpacity
                  key={value}
                  style={this.getSelectorStyle(value, _value)}
                  onPress={this.handleSelectPress.bind(this, value, _value)}>
                  <Text style={this.getSelectorTextStyle(value, _value)}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  expandIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#8f9ba7'
  },
  selectorsContainer: {
    marginTop: px2dp(20),
    marginHorizontal: px2dp(-10)
  },
  selectorsColumn: {
    flexDirection: 'row',
    marginBottom: px2dp(14)
  },
  selector: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: px2dp(10),
    // paddingVertical: px2dp(22),
    // paddingHorizontal: px2dp(22),
    height: px2dp(70),
    borderRadius: 5,
    backgroundColor: '#ebf0f5'
  },
  selectorChecked: {
    backgroundColor: '#8f9ba7'
  },
  selectorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: px2sp(24)
  },
  selectorTextChecked: {
    color: '#fff'
  }
})
