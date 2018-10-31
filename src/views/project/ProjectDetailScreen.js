import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { parseTime } from 'src/utils/format'
import { fetchProjectDetail, clearProjectDetail } from 'src/actions'

import talentNavDecorator from 'src/components/common/talentNavDecorator'
import ProjectPublisher from './components/ProjectPublisher'
import ProjectDetailHeader from './components/ProjectDetailHeader'
import ProjectDetailBottom from './components/ProjectDetailBottom'
import DetailLine from 'src/components/common/DetailLine'

const mapStateToProps = state => ({
  project: state.project.detail,
  user: state.auth.user,
  userInfo: state.auth.userInfo
})

const PublisherWithNav = talentNavDecorator(ProjectPublisher)

/**
 * @todo download file, hint: https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native
 */
@connect(mapStateToProps)
export default class ProjectDetailScreen extends React.Component {
  static navigationOptions = {
    header: <ProjectDetailHeader />
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props
    dispatch(fetchProjectDetail(navigation.getParam('projectId')))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearProjectDetail())
  }

  render() {
    const { project, user } = this.props
    const talentNav = {
      id: project.ownerId,
      type: project.ownerType
    }
    const projectInfo = {
      id: project.id,
      ownerId: project.ownerId,
      status: project.status,
      dockingStatus: project.dockingStatus
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailBlock}>
            <DetailLine leftLabel={'需求类型'} leftText={project.type} rightLabel={'需求学科'} rightText={project.subject} />
            <DetailLine leftLabel={'对接倾向'} leftText={project.toOriented} rightLabel={'预设金额'} rightText={project.money} />
            <DetailLine leftLabel={'开始时间'} leftText={parseTime(project.startTime)} rightLabel={'结束时间'} rightText={parseTime(project.endTime)} />
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

          <PublisherWithNav project={project} talentNav={talentNav} />
        </ScrollView>
        <ProjectDetailBottom project={projectInfo} userInfo={user} />

        {/* <View style={styles.bottomBlock}>
          <TouchableOpacity onPress={() => alert('star')} style={[styles.bottomBtn, styles.bottomBtnStar]} activeOpacity={1}>
            <Text style={styles.bottomBtnStarText}>
              <FontAwesome name="star-o" /> 关注
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('apply')} style={[styles.bottomBtn, styles.bottomBtnApply]} activeOpacity={1}>
            <Text style={styles.bottomBtnApplyText}>
              <MaterialIcons name="group-add" /> 报名
            </Text>
          </TouchableOpacity>
        </View> */}
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
  }
})
