import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'

export default class NewsItem extends React.Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image source={require('src/img/avatar1.png')} style={styles.newsPhoto} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.title}>
            <View style={{width: px2dp(350)}}>
              <Text style={styles.projectName}>贾志国</Text>
            </View>
            <Text style={styles.contentText}>2018-06-26</Text>
          </View>
          <View>
            <Text style={styles.contentText}>项目有了新进度，请注意查看</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(20),
    backgroundColor: '#fff'
  },

  newsPhoto: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(100 / 2)
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: px2dp(30)
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dp(16)
  },
  projectName: {
    fontSize: px2sp(28),
    color: '#333'
  },
  contentText: {
    fontSize: px2sp(28),
    color: '#999'
  }
})
