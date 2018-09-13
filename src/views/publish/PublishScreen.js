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

const items = [{
  icon: require('src/img/projectIcon.png'),
  name: '项目'
},
{
  icon: require('src/img/resultIcon.png'),
  name: '成果'
},
{
  icon: require('src/img/trendsIcon.png'),
  name: '动态'
}]
@withNavigation
export default class PublishScreen extends React.Component {
  state = {
    visible: true
  }

  setPublishItemOnClick(name) {
    let onClickLisenter
    if (name === '项目') {
      onClickLisenter = () => {
        alert('项目')
      }
    } else if (name === '成果') {
      onClickLisenter = () => {
        alert('成果')
      }
    } else if (name === '动态') {
      onClickLisenter = () => {
        this.props.navigation.navigate('Trends')
      }
    }
    return onClickLisenter
  }

  renderPublishItems() {
    return items.map((item, idx) => (
      <TouchableWithoutFeedback
        key={idx}
        onPress={this.setPublishItemOnClick(item.name)}
      >
        <View style={
          {alignItems: 'center'}}>
          <Image source={item.icon} style={{width: px2dp(100), height: px2dp(100)}} />
          <Text style={{color: '#666', fontSize: px2sp(30), marginTop: px2dp(41)}}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ))
  }

  render() {
    return (
      this.state.visible ? <View>
        <View style={styles.container}>
          <Text style={styles.descriptionTx}>选择您要发布的内容</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: px2dp(125),
            paddingRight: px2dp(125),
            marginTop: px2dp(178),
            width: '100%'
          }}>
            {this.renderPublishItems()}
          </View>
          <TouchableHighlight onPress={() => { this.setState({visible: false}) }}
            underlayColor="#E1F6FF">
            <Image source={require('src/img/publishClose.png')} style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
      </View> : null
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  closeIcon: {
    width: px2dp(40),
    height: px2dp(40),
    marginTop: px2dp(430)
  }
})
