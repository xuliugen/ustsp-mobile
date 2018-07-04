import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import { fetchPatentDetail, clearPatentDetail } from 'src/actions'
import { parseTime } from 'src/utils/format'

import PatentDetailHeader from './components/PatentDetailHeader'
import DetailLine from 'src/components/common/DetailLine'

const mapStateToProps = state => ({
  patent: state.patent.detail
})

/**
 * @todo: file download
 * @todo: 转让公示, 受让方信息
 * @todo: 询价
 */
@connect(mapStateToProps)
export default class PatentDetailScreen extends React.Component {
  static navigationOptions = {
    header: <PatentDetailHeader />
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props
    dispatch(fetchPatentDetail(navigation.getParam('patentId')))
  }

  componentWillUnmount() {
    this.props.dispatch(clearPatentDetail())
  }

  render() {
    const { patent } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailBlock}>
            <DetailLine leftLabel={'申请号'} leftText={patent.applicationNumber} rightLabel={'申请日'} rightText={parseTime(patent.applicationDate)} />
            <DetailLine leftLabel={'公开号'} leftText={patent.publicationNumber} rightLabel={'公开日'} rightText={parseTime(patent.publicationDate)} />
            <DetailLine leftLabel={'专利权人'} leftText={patent.applicant} rightLabel={'发明人'} rightText={patent.inventor} />
            <DetailLine leftLabel={'主分类号'} leftText={patent.classificationNumber} rightLabel={'分类号'} rightText={patent.classNumber} />
            <DetailLine leftLabel={'地址'} leftText={patent.address} rightLabel={'国省代码'} rightText={patent.provinceCode} />
            <DetailLine leftLabel={'法律状态'} leftText={patent.legalStatus} />
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>摘要</Text>
            <Text style={styles.abstBlockText}>{patent.abstracts}</Text>
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>转让者信息</Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={{ uri: patent.assignor.avatar }} style={styles.ownerAvatar} />
              </View>
              <View style={styles.ownerInfo}>
                <View>
                  <Text style={styles.ownerName}>{patent.assignor.username}</Text>
                  <Text style={styles.ownerTitle}>{patent.assignor.location} / 科研管理人员</Text>
                </View>
                <View>
                  <Text style={styles.contact}>联系方式</Text>
                  <Text style={styles.contact}>{patent.assignor.phone}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.fileBlock}>
            <View style={styles.fileBlockHeader}>
              <Text style={styles.label}>相关下载</Text>
            </View>
            <View style={styles.fileItemContainer}>
              <View style={styles.fileItem}>
                <Text style={styles.fileText}>专利.pdf</Text>
                <MaterialIcons name="keyboard-arrow-right" size={px2sp(30)} style={styles.fileGoIcon} />
              </View>
            </View>
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>转让公示</Text>
            <Text style={styles.transferText}>转让尚未完成</Text>
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>受让方信息</Text>
            <Text style={styles.transferText}>转让尚未完成</Text>
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
  detailBlock: {
    marginBottom: px2dp(30)
  },
  label: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  text: {
    fontSize: px2sp(32),
    color: '#333'
  },

  block: {
    marginBottom: px2dp(30),
    padding: px2dp(30),
    paddingBottom: px2dp(38),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  abstBlockLabel: {
    marginBottom: px2dp(22)
  },
  abstBlockText: {
    fontSize: px2sp(30),
    color: '#333'
  },

  ownerAvatar: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },
  ownerInfo: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: px2dp(22),
    paddingVertical: px2dp(12),
    justifyContent: 'space-between'
  },
  ownerName: {
    marginRight: px2dp(22),
    fontSize: px2sp(30),
    color: '#333'
  },
  ownerTitle: {
    fontSize: px2sp(28),
    color: '#999'
  },
  contact: {
    fontSize: px2sp(28),
    color: '#999'
  },
  fileBlock: {
    marginBottom: px2dp(30),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },
  fileBlockHeader: {
    padding: px2dp(30),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: px2dp(30),
    paddingVertical: px2dp(30)
  },
  fileText: {
    fontSize: px2sp(30),
    color: '#333'
  },
  transferText: {
    fontSize: px2dp(30),
    color: '#333'
  }
})
