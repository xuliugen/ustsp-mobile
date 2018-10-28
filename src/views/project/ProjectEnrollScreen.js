import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
export default class ProjectEnrollScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backbutton}
            onPress={() => { this.props.navigation.goBack(null) }}
          >
            <Image source={require('src/img/publishClose.png')} style={styles.backimage} />
          </TouchableOpacity>
          <Image source={require('src/img/publishSuccess.png')} style={styles.successimage} />
          <Text style={styles.successinfo}>您已成功报名项目</Text>
          <Text style={styles.projectname}>'项目名称'</Text>
          <Text style={styles.continue}>您现在可以继续</Text>
          <View style={styles.sharebutton}>
            <Text style={styles.sharetext}>分享给别人</Text>
          </View>
          <View style={styles.modifybutton}>
            <Text style={styles.modifytext}>修改我的简历</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
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
  },
  continue: {
    marginTop: px2dp(233),
    fontSize: px2sp(32),
    color: '#8f9ba7'
  },
  sharebutton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(39),
    width: px2dp(400),
    height: px2dp(88),
    borderWidth: px2dp(2),
    borderRadius: px2dp(10),
    borderColor: '#3091e6'
  },
  sharetext: {
    fontSize: px2dp(32),
    color: '#3091e6'
  },
  modifybutton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(27),
    marginBottom: px2dp(170),
    width: px2dp(400),
    height: px2dp(88),
    borderWidth: px2dp(2),
    borderRadius: px2dp(10),
    borderColor: '#3091e6',
    backgroundColor: '#3091e6'
  },
  modifytext: {
    fontSize: px2sp(32),
    color: '#ffffff'
  }
})
