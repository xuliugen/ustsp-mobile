import React from 'react'
import {
  Text
} from 'react-native'

import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import SelectView from 'src/views/publish/project/components/SelectView'
import ShortTextInputView from './components/ShortTextInputView'
import LongTextInputView from './components/LongTextInputView'
import { subject, province, city, skill, projectType } from 'src/constants/dataset'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userInfo: state.auth.userInfo
  }
}

let _this = null
@connect(mapStateToProps)
export default class ProjectContentSettingScreen extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: '发布新项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => _this.saveValue()}>
      保存</Text>
  })

  componentDidMount() {
    _this = this
  }

  onRef = (ref) => {
    this.child = ref
  }

  saveValue() {
    let item = _this.props.navigation.getParam('item', null)
    let callback = _this.props.navigation.getParam('callback', null)
    item.value = _this.child.getValue()
    callback(item)
    this.props.navigation.pop()
  }

  setSelectDatas(item) {
    const { user } = this.props
    let items = { data: [] }
    switch (item.params) {
      case 'type':
        items.data = projectType
        break
      case 'subject':
        items.data = subject
        break
      case 'province':
        items = province
        break
      case 'city':
        items = city
        break
      case 'contactWay':
        if (user.email != null) {
          items.data.push('邮箱: ' + user.email)
        }
        if (user.phone != null) {
          items.data.push('手机: ' + user.phone)
        }
        if (user.qq != null) {
          items.data.push('QQ: ' + user.qq)
        }
        if (user.weChat != null) {
          items.data.push('微信: ' + user.weChat)
        }
        break
      case 'toOriented':
        items.data = ['不限', '学生', '老师']
        break
      case 'projectSkillList':
        items.data = skill
        break
    }
    return items
  }
  renderView(item) {
    if (item.type === 'select_date') {
    } else if (item.type === 'select_value') {
      return (
        <SelectView items={this.setSelectDatas(item)} />
      )
    } else if (item.type === 'input_short_text') {
      return (
        <ShortTextInputView onRef={this.onRef} value={item.value} />
      )
    } else if (item.type === 'input_long_text') {
      return (
        <LongTextInputView onRef={this.onRef} value={item.value} />
      )
    }
  }
  render() {
    let item = this.props.navigation.getParam('item', null)
    return (
      this.renderView(item)
    )
  }
}
