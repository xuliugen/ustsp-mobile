import React from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import defaultAvatar from 'src/img/defaultAvatar.png'

import ProjectDetailHeader from './components/ProjectDetailHeader'

export default class ProjectDetailScreen extends React.Component {
  static navigationOptions = {
    header: <ProjectDetailHeader />
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailBlock}>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>需求类型</Text>
                <Text style={styles.text}>123</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>需求学科</Text>
                <Text style={styles.text}>123</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>对接倾向</Text>
                <Text style={styles.text}>123</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>预设金额</Text>
                <Text style={styles.text}>123</Text>
              </View>
            </View>
            <View style={styles.detailLine}>
              <View style={[styles.detailBox, styles.detailBoxLeft]}>
                <Text style={[styles.detailBoxLabel, styles.label]}>开始时间</Text>
                <Text style={styles.text}>123</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={[styles.detailBoxLabel, styles.label]}>结束时间</Text>
                <Text style={styles.text}>123</Text>
              </View>
            </View>
          </View>

          <View style={[styles.descBlock, styles.block]}>
            <Text style={[styles.label, styles.descBlockLabel]}>需求描述</Text>
            <Text style={styles.descBlockText}>刚刚查了下我的高考成绩，看到自己考了488分，别人考了690分的时候，我狠狠的锤了一下自己的兰博基尼的方向盘，不小心把手上的鸽子蛋戒指锤松......</Text>
          </View>

          <View style={[styles.skillBlock, styles.block]}>
            <Text style={[styles.label, styles.skillBlockLabel]}>需求描述</Text>
            <View style={styles.skillContainer}>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>前端123</Text>
              </View>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>后端123</Text>
              </View>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>后端123</Text>
              </View>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>后端123</Text>
              </View>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>后端123</Text>
              </View>
              <View style={styles.skillItem}>
                <Text style={styles.skillText}>后端123</Text>
              </View>
            </View>
          </View>

          <View style={[styles.fileBlock, styles.block]}>
            <View style={styles.fileBlockHeader}>
              <Text style={styles.label}>附件</Text>
            </View>
            <View style={styles.fileItemContainer}>
              <View style={[styles.fileItem, styles.fileItemNotLast]}>
                <Text style={styles.fileText}>附件1.docx</Text>
                <MaterialIcons name="keyboard-arrow-right" size={px2sp(30)} style={styles.fileGoIcon} />
              </View>
              <View style={styles.fileItem}>
                <Text style={styles.fileText}>附件2.docx</Text>
                <MaterialIcons name="keyboard-arrow-right" size={px2sp(30)} style={styles.fileGoIcon} />
              </View>
            </View>
          </View>

          <View style={[styles.publisherBlock, styles.block]}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={defaultAvatar} style={styles.publisherAvatar} />
              </View>
              <View style={styles.publisherInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.publisherName}>乌鸦坐飞机</Text>
                  <Text style={styles.publisherTitle}>电子科技大学 / 外语系 / 教授</Text>
                </View>
                <View>
                  <Text style={styles.publisherDate}>发布于 2018-2-29</Text>
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
