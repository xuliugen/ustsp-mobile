import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { parseTime } from 'src/utils/format'

import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import DetailLine from 'src/components/common/DetailLine'

const mapStateToProps = state => ({
  project: state.project.detail
})

/**
 * @todo download file, hint: https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native
 */

@connect(mapStateToProps)
export default class ProjectPreviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '预览',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => navigation.state.params.publishProject()}>
      发布</Text>
  })

  componentDidMount() {
    this.props.navigation.setParams({ publishProject: this.publishProject })
  }

  publishProject() {
    alert('发布')
  }

  render() {
    let values = this.props.navigation.getParam('values', new Map())
    return (
      <View style={styles.container}>
        <ScrollView style={{height: '100%'}}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{values.get('title')}</Text>
              <Text style={styles.deadline}>报名截止于 {values.get('deadline')}</Text>
            </View>
            <View style={{alignItems: 'flex-end', marginTop: px2dp(10)}}>
              <Text style={styles.moneyTx}>预设金额</Text>
              <View style={styles.moneyContanier}>
                <Text style={styles.moneySign}>¥</Text>
                <Text style={styles.money}>{values.get('money')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailBlock}>
            <DetailLine leftLabel={'需求类型'} leftText={values.get('type')} rightLabel={'需求学科'} rightText={values.get('subject')} />
            <DetailLine leftLabel={'对接倾向'} leftText={values.get('toOriented')} rightLabel={'联系方式'} rightText={values.get('contactWay')} />
            <DetailLine leftLabel={'开始时间'} leftText={parseTime(values.get('startTime'))} rightLabel={'结束时间'} rightText={parseTime(values.get('endTime'))} />
          </View>

          <View style={[styles.descBlock, styles.block]}>
            <Text style={[styles.label, styles.descBlockLabel]}>需求描述</Text>
            <Text style={styles.descBlockText}>{values.get('projectIntroduction')}</Text>
          </View>

          <View style={[styles.skillBlock, styles.block]}>
            <Text style={[styles.label, styles.skillBlockLabel]}>技能要求</Text>
            <View style={styles.skillContainer}>
              { values.get('projectSkillList') !== undefined ? values.get('projectSkillList').map((skill, idx) => (
                <View key={idx} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              )) : <Text >未填写</Text>}
            </View>
          </View>

          <View style={[styles.fileBlock, styles.block]}>
            <View style={styles.fileBlockHeader}>
              <Text style={styles.label}>附件</Text>
            </View>
            <View style={styles.fileItemContainer}>
              <View style={styles.fileItem}>
                <Text style={styles.fileText}>需求附件.docx</Text>
                <MaterialIcons name="keyboard-arrow-right" size={px2sp(30)} style={styles.fileGoIcon} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: APP_BACKGROUD_COLOR
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    height: px2dp(88)
    // borderTopWidth: 1,
    // borderTopColor: '#ddd',
  },
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBtnStar: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff'
  },
  bottomBtnStarText: {
    fontSize: px2sp(30),
    color: '#8f9ba7'
  },
  bottomBtnApply: {
    backgroundColor: '#3091e6'
  },
  bottomBtnApplyText: {
    fontSize: px2sp(30),
    color: '#fff'
  },

  label: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  text: {
    fontSize: px2sp(32),
    color: '#333'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: px2dp(30),
    paddingBottom: px2dp(34),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(40),
    marginTop: px2dp(30)
  },
  detailBlock: {
    marginTop: px2dp(30),
    marginBottom: px2dp(30)
  },
  detailLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  detailBox: {
    flex: 1,
    paddingTop: px2dp(26),
    paddingBottom: px2dp(36),
    paddingLeft: px2dp(30),
    backgroundColor: '#fff'
  },
  detailBoxLeft: {
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  detailBoxLabel: {
    marginBottom: px2dp(20)
  },

  block: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  descBlock: {
    marginBottom: px2dp(30),
    padding: px2dp(30),
    paddingBottom: px2dp(38),
    backgroundColor: '#fff'
  },
  descBlockLabel: {
    marginBottom: px2dp(22)
  },
  descBlockText: {
    fontSize: px2sp(30),
    color: '#333'
  },

  skillBlock: {
    marginBottom: px2dp(30),
    paddingTop: px2dp(32),
    paddingBottom: px2dp(8),
    paddingHorizontal: px2dp(30),
    backgroundColor: '#fff'
  },
  skillBlockLabel: {
    marginBottom: px2dp(22)
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skillItem: {
    marginRight: px2dp(20),
    marginBottom: px2dp(20),
    paddingVertical: px2dp(16),
    paddingHorizontal: px2dp(20),
    backgroundColor: '#ebf0f5',
    borderRadius: 5
  },
  skillText: {
    fontSize: px2sp(30),
    color: '#666'
  },

  fileBlock: {
    marginBottom: px2dp(30),
    backgroundColor: '#fff'
  },
  fileBlockHeader: {
    padding: px2dp(30),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  fileItemContainer: {},
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: px2dp(30),
    paddingVertical: px2dp(30)
  },
  fileItemNotLast: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  fileText: {
    fontSize: px2sp(30),
    color: '#333'
  },
  fileGoIcon: {
    color: '#999'
  },
  title: {
    fontSize: px2sp(36),
    color: '#333'
  },
  deadline: {
    fontSize: px2sp(26),
    color: '#8f9ba7',
    marginTop: px2dp(20)
  },
  moneyTx: {
    fontSize: px2sp(26),
    color: '#8f9ba7'
  },
  moneySign: {
    fontSize: px2sp(26),
    color: '#8f9ba7',
    marginBottom: px2dp(3)
  },
  money: {
    fontSize: px2sp(36),
    color: '#3793e3'
  },
  moneyContanier: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: px2dp(16)
  }
})
