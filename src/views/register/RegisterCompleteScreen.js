import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import {px2dp, px2sp} from "../../utils/device";
import {THEME_COLOR} from "../../styles/common";

@withNavigation
export default class RegisterCompleteScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeLog}>
          <View style={styles.imgContainer}>
            <Image style={styles.logImg} source={require('src/img/welcomeLog.png')} />
          </View>
          <Text style={styles.welcomeText}>注册成功，欢迎加入Uppfind</Text>
        </View>
        <View style={styles.nextOperation}>
          <Text style={styles.nextText}>您现在可以继续</Text>
          <TouchableOpacity onPress={() => this.props.navigation.popToTop()} style={[styles.btns, styles.completeInfoBtn]}>
            <Text style={styles.completeInfoText}>完善资料</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.popToTop()} style={[styles.btns, styles.toHomeBtn]}>
            <Text style={styles.toHomeText}>进入主页</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  welcomeLog: {
    position: 'absolute',
    top: px2dp(290),
    alignItems: 'center'
  },
  imgContainer: {
    marginBottom: px2dp(43)
  },
  logImg: {
    width: px2dp(260),
    height: px2dp(260)
  },
  welcomeText: {
    fontSize: px2sp(36),
    color: '#8f9ba7'
  },

  nextOperation: {
    position: 'absolute',
    bottom: px2dp(169),
    alignItems: 'center'
  },
  nextText: {
    fontSize: px2sp(32),
    color: '#8f9ba7'
  },
  btns: {
    width: px2dp(400),
    paddingVertical: px2dp(28),
    borderRadius: px2dp(10)
  },
  completeInfoBtn: {
    marginTop: px2dp(40),
    borderWidth: px2dp(2),
    borderColor: '#1dbbae'
  },
  completeInfoText: {
    textAlign: 'center',
    fontSize: px2sp(32),
    color: '#1dbbae'
  },
  toHomeBtn: {
    marginTop: px2dp(28),
    backgroundColor: THEME_COLOR
  },
  toHomeText: {
    textAlign: 'center',
    fontSize: px2sp(32),
    color: '#fff'
  }
})
