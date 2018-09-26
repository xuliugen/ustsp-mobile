import React from 'react'
import {
  Text,
  View
} from 'react-native'

import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import SelectView from 'src/views/publish/project/components/SelectView'
import ShortTextInputView from './components/ShortTextInputView'
import LongTextInputView from './components/LongTextInputView'
import { subject, skill, projectType } from 'src/constants/dataset'
import { connect } from 'react-redux'
import SelectMultiView from './components/SelectMultiView'
import CitySelectView from './components/CitySelectView'

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userInfo: state.auth.userInfo
  }
}

@connect(mapStateToProps)
export default class ProjectContentSettingScreen extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: '发布新项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: navigation.getParam('headerRightView')
  })

  renderHeaderRightView() {
    let item = this.props.navigation.getParam('item', null)
    if (item.type === 'input_short_text' || item.type === 'input_long_text' || item.type === 'select_multi_value') {
      return <Text
        style={HEADER_STYLE.headerRightStyle}
        onPress={() => this.saveValue()}>
      确认</Text>
    } else {
      return <View />
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ headerRightView: this.renderHeaderRightView() })
  }

  onRef = (ref) => {
    this.child = ref
  }

  saveValue() {
    let item = this.props.navigation.getParam('item', null)
    let callback = this.props.navigation.getParam('callback', null)
    item.value = this.child.getValue()
    callback(item)
    this.props.navigation.pop()
  }

  setSelectDatas(item) {
    const { user } = this.props
    let items = { data: [] }
    switch (item.params) {
      case 'type':
        items.data = projectType.map((item, idx) => ({ value: item }))
        break
      case 'subject':
        items.data = subject.map((item, idx) => ({ value: item }))
        break
      case 'contactWay':
        items = this.showContactWay(user)
        break
      case 'toOriented':
        items.data = [{ value: '不限' }, { value: '学生' }, { value: '老师' }]
        break
      case 'projectSkillList':
        items.data = skill
        break
    }
    return items
  }

  showContactWay(user) {
    let items = { data: [] }
    if (user.email != null) {
      items.data.push({ value: '邮箱: ' + user.email })
    }
    if (user.phone != null) {
      items.data.push({ value: '手机: ' + user.phone })
    }
    if (user.qq != null) {
      items.data.push({ value: 'QQ: ' + user.qq })
    }
    if (user.weChat != null) {
      items.data.push('微信: ' + user.weChat)
    }
    return items
  }

  renderView(item) {
    if (item.type === 'select_value') {
      if (item.params === 'location') {
        return (
          <CitySelectView />
        )
      }
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
    } else if (item.type === 'select_multi_value') {
      return (
        <SelectMultiView onRef={this.onRef} values={item.value} items={this.setSelectDatas(item)} />
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
