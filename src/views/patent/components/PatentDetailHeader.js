import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { STATUS_BAR_HEIGHT, px2dp, px2sp } from 'src/utils/device'

const mapStateToProps = state => ({
  patent: state.patent.detail
})

@connect(mapStateToProps)
@withNavigation
export default class PatentDetailHeader extends React.Component {
  handleGoBackPress = () => {
    this.props.navigation.goBack(null)
  }
  handleSharePress = () => {
    alert('hi')
  }

  render() {
    const { patent } = this.props
    return (
      <ImageBackground source={require('./patentHeader.png')} style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.pageHeader}>
            <Feather name="arrow-left" size={18} style={styles.goback} onPress={this.handleGoBackPress} />
            <Text style={styles.headerTitle}>专利详情</Text>
            {/* <Entypo name="share" size={18} style={styles.share} onPress={this.handleSharePress} /> */}
            <View />
          </View>
          <View style={styles.titleWrapper}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{patent.patentName}</Text>
            </View>
            <View>
              <View style={styles.category}>
                <Text style={styles.categoryText}>{patent.patentType}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    paddingTop: STATUS_BAR_HEIGHT
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: px2dp(40),
    paddingHorizontal: px2dp(30)
  },
  goback: {
    color: '#fff'
  },
  share: {
    color: '#fff'
  },
  headerTitle: {
    fontSize: px2sp(36),
    color: '#fff'
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(80),
    marginBottom: px2dp(50),
    paddingHorizontal: px2dp(30)
  },
  title: {
    width: px2dp(400)
  },
  titleText: {
    fontSize: px2sp(36),
    color: '#fff'
  },
  category: {
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(10),
    borderRadius: px2dp(10),
    backgroundColor: '#1dbbae'
  },
  categoryText: {
    fontSize: px2sp(26),
    color: '#fff'
  }
})
