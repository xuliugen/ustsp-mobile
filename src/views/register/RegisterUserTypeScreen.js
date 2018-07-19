import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { setRegisterUserType } from 'src/actions'

@connect()
@withNavigation
export default class RegisterUserTypeScreen extends React.Component {
  static navigationOptions = {
    title: '选择身份',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  onTypeBtnPress = (userType) => {
    this.props.dispatch(setRegisterUserType(userType))
    this.props.navigation.push('Register2')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tipsText}>请先选择您的身份</Text>
        <View style={styles.roleCardContainer}>
          <TouchableOpacity onPress={this.onTypeBtnPress.bind(this, 1)} style={styles.roleCard}>
            <Text style={styles.stuText}>我是学生</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onTypeBtnPress.bind(this, 2)} style={styles.roleCard}>
            <Text style={styles.stuText}>我是教师</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onTypeBtnPress.bind(this, 3)} style={styles.roleCard}>
            <Text style={styles.stuText}>我是企业人员</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: px2dp(60),
    paddingTop: px2dp(54),
    backgroundColor: '#fff'
  },
  tipsText: {
    fontSize: px2sp(32),
    color: '#666'
  },

  roleCardContainer: {
    marginTop: px2dp(35)
  },
  roleCard: {
    marginBottom: px2dp(20),
    borderRadius: px2dp(10),
    paddingVertical: px2dp(60),
    backgroundColor: '#ebf0f5'
  },
  stuText: {
    textAlign: 'center',
    fontSize: px2sp(32),
    color: '#666'
  }
})
