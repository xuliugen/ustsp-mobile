import React from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { fetchProjectDetail } from 'src/ajax/project'
import { parseTime, parseUserType } from 'src/utils/format'

import ProjectDetailHeader from './components/ProjectDetailHeader'

/**
 * @todo Use Redux to pass state to detail content and detail header
 * @todo download file, hint: https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native
 */
export default class ProjectDetailScreen extends React.Component {
  static navigationOptions = {
    header: <ProjectDetailHeader project={{}} />
  }

  state = {
    project: {
      skills: []
    }
  }

  componentDidMount() {
    this.fetchDetail()
  }

  async fetchDetail() {
    const { navigation } = this.props
    const projectId = navigation.getParam('projectId')
    const { data } = await fetchProjectDetail(projectId)
    let { projectInfoVo, ...baseData } = data
    let projectData = Object.assign({}, baseData, projectInfoVo.projectResearchInfo, {
      skills: projectInfoVo.projectSkillList || []
    })
    this.setState({
      project: projectData
    })
    const headerData = {
      projectName: projectData.projectName,
      money: projectData.money,
      deadline: projectData.deadline
    }
    this.constructor.navigationOptions = {
      header: <ProjectDetailHeader project={headerData} />
    }
  }

  render() {
    const { project } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailBlock}>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>需求类型</Text>
                <Text style={styles.text}>{project.type}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>需求学科</Text>
                <Text style={styles.text}>{project.subject}</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>对接倾向</Text>
                <Text style={styles.text}>{project.toOriented}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>预设金额</Text>
                <Text style={styles.text}>{project.money}</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>开始时间</Text>
                <Text style={styles.text}>{parseTime(project.startTime)}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>结束时间</Text>
                <Text style={styles.text}>{parseTime(project.endTime)}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.descBlock, styles.block]}>
            <Text style={[styles.label, styles.descBlockLabel]}>需求描述</Text>
            <Text style={styles.descBlockText}>{project.projectIntroduction}</Text>
          </View>

          <View style={[styles.skillBlock, styles.block]}>
            <Text style={[styles.label, styles.skillBlockLabel]}>技能要求</Text>
            <View style={styles.skillContainer}>
              {project.skills.map(({ skill }, idx) => (
                <View key={idx} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
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

          <View style={[styles.publisherBlock, styles.block]}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={{ uri: project.ownerAvatarUrl }} style={styles.publisherAvatar} />
              </View>
              <View style={styles.publisherInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.publisherName}>{project.ownerName}</Text>
                  <Text style={styles.publisherTitle}>{project.ownerLocation} / {parseUserType(project.ownerType)}</Text>
                </View>
                <View>
                  <Text style={styles.publisherDate}>发布于 {parseTime(project.createTime)}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBlock}>
          <TouchableOpacity onPress={() => alert('star')} style={[styles.bottomBtn, styles.bottomBtnStar]} activeOpacity={1}>
            <Text style={styles.bottomBtnStarText}>
              <FontAwesome name="star-o" /> 关注
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('apply')} style={[styles.bottomBtn, styles.bottomBtnApply]} activeOpacity={1}>
            <Text style={styles.bottomBtnApplyText}>
              <MaterialIcons name="group-add"/> 报名
            </Text>
          </TouchableOpacity>
        </View>
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
    height: px2dp(88),
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
    backgroundColor: '#3091e6',
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

  detailBlock: {
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

  publisherBlock: {
    marginBottom: px2dp(30 + 88),
    padding: px2dp(30),
    backgroundColor: '#fff'
  },
  publisherAvatar: {
    width: px2dp(100),
    height: px2dp(100)
  },
  publisherInfo: {
    marginLeft: px2dp(22),
    paddingVertical: px2dp(12),
    justifyContent: 'space-between'
  },
  publisherName: {
    marginRight: px2dp(22),
    fontSize: px2sp(28),
    color: '#333'
  },
  publisherTitle: {
    fontSize: px2sp(28),
    color: '#999'
  },
  publisherDate: {
    fontSize: px2sp(26),
    color: '#999'
  }
})
