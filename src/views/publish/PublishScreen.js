import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  View,
  TouchableHighlight
} from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { checkIfLogin } from 'src/selectors'

const items = [{
  icon: require('src/img/projectIcon.png'),
  name: '项目'
},
// {
//   icon: require('src/img/resultIcon.png'),
//   name: '成果'
// },
{
  icon: require('src/img/newsIcon.png'),
  name: '动态'
}]
const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state)
  }
}

@connect(mapStateToProps)
@withNavigation
export default class PublishScreen extends React.Component {
  onItemPress = (name) => {
    const key = this.mapNavigateKeyByName(name)
    if (key != null) {
      this.props.navigation.navigate(key)
    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      checkIsLogin => {
        if (!this.props.isLogin) {
          this.props.navigation.goBack(null)
          this.props.navigation.navigate('Login')
        }
      }
    )
  }
  mapNavigateKeyByName(name) {
    switch (name) {
      case '项目' :
        return 'ProjectPublish'
      case '动态' :
        return 'NewsPublish'
      // case '成果' :
      //   break
      default :
        return 'PublishModal'
    }
  }

  renderPublishItems() {
    return items.map((item, idx) => (
      <TouchableWithoutFeedback
        key={idx}
        onPress={this.onItemPress.bind(this, item.name)}
      >
        <View style={
          {alignItems: 'center'}}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.descriptionTx}>选择您要发布的内容</Text>
        <View style={styles.items}>
          {this.renderPublishItems()}
        </View>
        <TouchableHighlight
          onPress={() => { this.props.navigation.goBack(null) }}
          underlayColor="#E1F6FF"
          style={{
            position: 'absolute',
            top: '90%'
          }}>
          <Image source={require('src/img/publishClose.png')} style={styles.closeIcon} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    opacity: 0.8
  },
  descriptionTx: {
    fontSize: px2sp(36),
    color: '#8f9ba7',
    marginTop: px2dp(360)
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: px2dp(125),
    paddingRight: px2dp(125),
    marginTop: px2dp(178),
    width: '100%'
  },
  icon: {
    width: px2dp(100), height: px2dp(100)
  },
  name: {
    color: '#666',
    fontSize: px2sp(30),
    marginTop: px2dp(41)
  },
  closeIcon: {
    width: px2dp(40),
    height: px2dp(40)
  }
})
