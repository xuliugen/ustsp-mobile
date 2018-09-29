import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'

class SelectItem extends React.Component {
  onItemPress = (item) => {
    let callback = this.props.callback
    callback(item)
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onItemPress.bind(this, this.props.item)}>
        <View style={styles.valueContainer}>
          <Text style={styles.name}>{this.props.item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(SelectItem)

const styles = StyleSheet.create({
  container: {
    paddingLeft: px2dp(30),
    height: px2dp(88),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  name: {
    color: 'black',
    fontSize: px2sp(30)
  },
  content: {
    color: '#666',
    fontSize: px2sp(25),
    marginTop: px2dp(-2),
    marginRight: px2dp(-20)
  },
  rightArrow: {
    marginRight: px2dp(-20)
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
