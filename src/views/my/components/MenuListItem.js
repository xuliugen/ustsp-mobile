import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

@withNavigation
export default class MenuListItem extends React.Component {
  handlePress = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    const { item } = this.props
    return (
      <TouchableOpacity onPress={this.handlePress} >
        <View style={styles.container} >
          <View style={styles.side}>
            <Ionicons name={item.iconName} size={26} color="#8f9ba7" />
            <Text style={styles.title} >{item.text}</Text>
          </View>
          <View style={styles.side}>
            {item.num ? (<Text style={styles.number} >134</Text>) : null}
            <MaterialIcons name="keyboard-arrow-right" style={styles.arrowRight} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: px2dp(28),
    paddingHorizontal: px2dp(33),
    marginBottom: 1,
    backgroundColor: '#fff'
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginLeft: px2dp(30),
    fontSize: px2sp(32),
    color: '#333'
  },
  number: {
    fontSize: px2sp(26),
    color: '#999'
  },
  arrowRight: {
    marginLeft: px2dp(25),
    fontSize: px2sp(30),
    color: '#999'
  }
})
