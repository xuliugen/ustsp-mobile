import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import PatentDetailHeader from './components/PatentDetailHeader'
import {APP_BACKGROUD_COLOR} from "../../styles/common";
import {px2dp, px2sp} from "../../utils/device";

export default class PatentDetailScreen extends React.Component {
  static navigationOptions = {
    header: <PatentDetailHeader />
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailBlock}>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>申请号</Text>
                <Text style={styles.text}>201110045064X</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>申请日</Text>
                <Text style={styles.text}>2016-06-24</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>公开号</Text>
                <Text style={styles.text}>201110045064X</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>公开日</Text>
                <Text style={styles.text}>2016-06-25</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>专利权人</Text>
                <Text style={styles.text}>电子科技大学</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>发明人</Text>
                <Text style={styles.text}>高伟</Text>
              </View>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>摘要</Text>
            <Text style={styles.abstBlockText}>本发明公开了一种并网运行模式下的微电网实时能量优化调度方法。</Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.label, styles.abstBlockLabel]}>转让者信息</Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={require('../../img/banner1.png')} style={styles.ownerAvatar} />
              </View>
              <View style={styles.ownerInfo}>
                <View>
                  <Text style={styles.ownerName}>uppfind管理员</Text>
                  <Text style={styles.ownerTitle}>电子科技大学 / 管理人员</Text>
                </View>
                <View>
                  <Text style={styles.contact}>联系方式</Text>
                  <Text style={styles.contact}>18482212054</Text>
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
                <Text style={styles.fileText}>需求附件.docx</Text>
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
    fontWeight: 'bold'
  }
})
