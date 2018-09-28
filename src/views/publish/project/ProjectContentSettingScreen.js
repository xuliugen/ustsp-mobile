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
import { setSelectOneItemAdapter, setSelectMultiItemAdapter } from './components/SelectDataAdapter'
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
        items = setSelectOneItemAdapter({srcData: projectType})
        break
      case 'subject':
        items = setSelectOneItemAdapter({srcData: subject})
        break
      case 'contactWay':
        items = this.showContactWay(user)
        break
      case 'toOriented':
        items = setSelectOneItemAdapter({srcData: ['不限', '学生', '老师']})
        break
      case 'projectSkillList':
        items = setSelectMultiItemAdapter({srcData: skill})
        break
    }
    return items
  }

  showContactWay(user) {
    let items = { data: [] }
    let srcData = []
    if (user.email != null) {
      srcData.push('邮箱: ' + user.email)
    }
    if (user.phone != null) {
      srcData.push('手机: ' + user.phone)
    }
    if (user.qq != null) {
      srcData.push('QQ: ' + user.qq)
    }
    if (user.weChat != null) {
      srcData.push('微信: ' + user.weChat)
    }
    items = setSelectOneItemAdapter({srcData: srcData})
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
