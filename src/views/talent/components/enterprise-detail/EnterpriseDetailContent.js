import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { Entry, FoldEntry } from '../set'

export default class EnterpriseDetailContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>基本资料</Text>
          <Entry title="企业名称" text="移智有方科技有限公司" />
          <Entry title="地址" text="四川成都" />
          <Entry title="企业主页" text="www.baidu.com" />
          <Entry title="联系电话" text="暂无" />
        </View>
        <View>
          <Text style={styles.title}>企业简介</Text>
          <FoldEntry text="2009 年博士毕业于电子科技大学计算机应用技术专业，2012年晋升为电子科技大学副教授和硕士生导师，2017年12月新增为博士生导师。本硕博期间，多次曾获得电子科技大学一等奖学金。获国家留基委和丹麦政府文化交流奖学金，于2011-2012在丹麦DTU大学进行为期一年的嵌入式系统前沿技术研究。2012年4月在瑞典林雪平大学ESLAB实验室进行短期访问研究。主要研究领域为可信嵌入式系统、移动互联网、新存储及大数据加速处理。走访20余国家和地区，爱好旅游、羽毛球和吉它。 致力于培养高瞻远瞩、放眼世界、技术过硬的优秀学生。曾亲自指导的一名学生（2015年本科毕业）入职并担任深圳麦开网络技术有限公司CTO，现任香港跨境“纳美致生物科技公司”系统架构师。曾亲自指导电子科大智能听诊团队，并获得第九届成都国际软件设计与应用大赛“一等奖”和第三届“创青春”四川青年创新创业大赛“银奖”，所培养学生创立公司并任CEO。指导并推荐研究生拿到美国圣母大学（1）、美国德州大学（2）、香港城大（1）的PHD offer。目前已有两位毕业并在美国IBM和Facebook工作。 学生培养模式： 1）与阿里菜鸟“物流宝平台技术部”、腾讯“架构平台组”等知名公司达成从项目研发、技术交流到学生人才输送的全方位合作； 2）与美国圣母大学、美国德州大学、香港城大、香港理工等国际一流的大学研究组联合培养硕士/博士研究生，每年均有赴国外/境外深造名额。" />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: px2dp(88)
  },
  title: {
    paddingLeft: px2dp(30),
    paddingVertical: px2dp(37),
    fontSize: px2sp(28),
    color: '#666'
  }
})
