import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'

export default class ProjectEnrollScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backbutton}
          onPress={() => { this.props.navigation.goBack(null) }}
        >
          <Image source={require('src/img/publishClose.png')} style={styles.backimage} />
        </TouchableOpacity>
        <Image source={require('src/img/publishSuccess.png')} style={styles.successimage} />
        <Text style={styles.successinfo}>您已成功报名项目</Text>
        <Text style={styles.projectname}>{ this.props.navigation.state.params.projectName }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%'
  },
  backbutton: {
    position: 'absolute',
    top: px2dp(70),
    left: px2dp(38)
  },
  backimage: {
    width: px2dp(25),
    height: px2dp(25)
  },
  successimage: {
    width: px2dp(360),
    height: px2dp(360),
    marginTop: px2dp(290),
    padding: px2dp(0)
  },
  successinfo: {
    marginTop: px2dp(47),
    fontSize: px2sp(30),
    color: '#8f9ba7'
  },
  projectname: {
    fontSize: px2sp(30),
    color: '#8f9ba7'
  }
})
