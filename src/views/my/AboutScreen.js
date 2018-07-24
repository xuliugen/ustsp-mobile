import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: '关于'
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('src/img/uppfind.png')} style={{ marginTop: 50 }} />
        <Text style={{ marginTop: 50, color: '#999' }}>0.0.1</Text>
        <Text style={{ color: '#999' }}>@2016-2018 uppfind.com. All rights reserved.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
