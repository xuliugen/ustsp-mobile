import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import ListItem from 'src/views/publish/common/components/ListItem'

let _this = null
const items = [
  { data: [{
    name: '标题',
    isMust: true
  },
  {
    name: '类型',
    isMust: true
  },
  {
    name: '学科',
    isMust: true
  },
  {
    name: '专业',
    isMust: true
  }]
  },
  { data: [{
    name: '开始时间',
    isMust: false
  },
  {
    name: '结束时间',
    isMust: false
  },
  {
    name: '报名截止',
    isMust: true
  }] },
  { data: [{
    name: '所在地',
    isMust: true
  },
  {
    name: '联系方式',
    isMust: true
  }]
  },
  { data: [{
    name: '技能要求',
    isMust: false
  },
  {
    name: '对接倾向',
    isMust: false
  }]}
]

export default class ProjectPublishScreen extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: '发布新项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => _this.publishContent()}>
      发布</Text>
  })

  componentDidMount() {
    _this = this
  }

  publishContent = () => {
    this.props.navigation.navigate('ProjectPreview', {
      'type': 'project'
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
          renderItem={({ item, index }) => <ListItem name={item.name} isMust={item.isMust} key={index} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ height: px2dp(30) }} />
          )}
          sections={items}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F5'
  },
  divider: {
    height: px2dp(1),
    borderTopWidth: px2dp(1),
    borderTopColor: '#ddd',
    marginTop: px2dp(28)
  }
})
