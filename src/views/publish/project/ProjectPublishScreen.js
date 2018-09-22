import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import ProjectPropertyItem from 'src/views/publish/project/components/ProjectPropertyItem'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'

let _this = null
const SLECT_DATE = 'select_date'
const SLECT_VALUE = 'select_value'
const INPUT_SHORT_TEXT = 'input_short_text'
const INPUT_LONG_TEXT = 'input_long_text'

const map = new Map()
const items = [
  { data: [{
    name: '名称',
    params: 'title',
    isMust: true,
    value: null,
    type: INPUT_SHORT_TEXT
  },
  {
    name: '类型',
    isMust: true,
    params: 'type',
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '学科',
    isMust: true,
    params: 'subject',
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '预设金额',
    isMust: true,
    params: 'money',
    value: null,
    type: INPUT_SHORT_TEXT
  }]
  },
  { data: [{
    name: '开始时间',
    params: 'startTime',
    value: null,
    isMust: true,
    type: SLECT_DATE
  },
  {
    name: '结束时间',
    params: 'endTime',
    isMust: true,
    value: null,
    type: SLECT_DATE
  },
  {
    name: '报名截止',
    params: 'deadline',
    isMust: true,
    value: null,
    type: SLECT_DATE
  }] },
  { data: [{
    name: '省份',
    params: 'province',
    isMust: true,
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '城市',
    params: 'city',
    isMust: true,
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '联系方式',
    params: 'contactWay',
    isMust: true,
    value: null,
    type: SLECT_VALUE
  }]
  },
  { data: [{
    name: '对接倾向',
    isMust: false,
    params: 'toOriented',
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '技能要求',
    params: 'projectSkillList',
    isMust: false,
    value: null,
    type: SLECT_VALUE
  },
  {
    name: '需求描述',
    params: 'projectIntroduction',
    isMust: false,
    value: null,
    type: INPUT_LONG_TEXT
  }]}
]

export default class ProjectPublishScreen extends React.Component {
  setPropertyValueCallback = (item) => {
    map.set(item.params, item.value)
  }

  constructor(props) {
    super(props)
    this.alert = React.createRef()
  }

  componentDidMount() {
    _this = this
    MessageBarManager.registerMessageBar(this.alert.current)
  }
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }

  static navigationOptions = () => ({
    title: '发布新项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => _this.publishContent()}>
      发布</Text>
  })

  publishContent = () => {
    if (map.get('title') === undefined) {
    //   this.showMessageBar('请填写项目名称')
    // } else if (map.get('type') === undefined) {
    //   this.showMessageBar('请填写项目类型')
    // } else if (map.get('subject') === undefined) {
    //   this.showMessageBar('请选择项目行业')
    // } else if (map.get('money') === undefined) {
    //   this.showMessageBar('请填写预设金额')
    // } else if (map.get('deadline') !== undefined) {
    //   // this.showMessageBar('请选择报名截止时间')
    // } else if (map.get('startTime') !== undefined) {
    //   // this.showMessageBar('请选择项目开始时间')
    // } else if (map.get('endTime') !== undefined) {
    //   // this.showMessageBar('请选择项目结束时间')
    // } else if (map.get('province') !== undefined) {
    //   this.showMessageBar('请选择省份名称')
    // } else if (map.get('city') !== undefined) {
    //   this.showMessageBar('请选择城市名称')
    // } else if (map.get('contactWay') !== undefined) {
    //   this.showMessageBar('请选择联系方式')
    } else {
      this.props.navigation.navigate('ProjectPreview', {
        values: map
      })
    }
  }

  showMessageBar(message) {
    MessageBarManager.showAlert({
      title: '系统提示',
      message: message,
      alertType: 'info'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: px2sp(28),
            color: '#8f9ba7',
            marginTop: px2dp(28),
            marginLeft: px2dp(30)}}>* 为必填选项</Text>
        <SectionList
          renderItem={({ item, index }) =>
            <ProjectPropertyItem
              propertyValueCallback={this.setPropertyValueCallback}
              item={item}
              key={index} />}
          renderSectionHeader={() => (
            <View style={{ height: px2dp(30) }} />
          )}
          sections={items}
          keyExtractor={(item, index) => item + index}
        />
        <MessageBar ref={this.alert} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F5'
  }
})
