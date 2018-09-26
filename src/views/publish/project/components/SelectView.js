import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import SelectItem from 'src/views/publish/project/components/SelectItem'
import { withNavigation } from 'react-navigation'

class SelectView extends React.Component {
  saveSelectValue(selectValueItem) {
    let item = this.props.navigation.getParam('item', null)
    item.value = selectValueItem.value
    let callback = this.props.navigation.getParam('callback', null)
    callback(item)
    this.props.navigation.pop()
  }

  render() {
    let item = this.props.navigation.getParam('item', null)
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}>{'选择' + item.name}</Text>
        <SectionList
          renderItem={({ item, index }) => <SelectItem item={item} key={index} callback={this.saveSelectValue.bind(this)} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ height: px2dp(30) }} />
          )}
          sections={[this.props.items]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

export default withNavigation(SelectView)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F5'
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7',
    marginTop: px2dp(28),
    marginLeft: px2dp(30)}
})
