import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SectionList } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

class SelectMultiView extends React.Component {
  state = {
    selectValues: this.props.values !== null ? this.props.values : []
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  getValue = () => {
    return this.state.selectValues
  }

  onItemPress = (value, selected) => {
    let selectValues = this.state.selectValues
    if (selected) {
      selectValues.push(value)
    } else {
      let index = selectValues.indexOf(value)
      if (index > -1) {
        selectValues.splice(index, 1)
      }
    }
    this.setState({
      selectValues: selectValues
    })
  }

  renderItem(itemValue, selected, index) {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onItemPress.bind(this, itemValue, !selected)}>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{itemValue}</Text>
          {selected ? <Ionicons
            style={{marginRight: px2dp(30)}}
            name={'ios-checkmark'}
            color={'#8d9ca7'}
            size={40} /> : null}
        </View>
      </TouchableOpacity>
    )
  }

  isSelectValue(value) {
    if (this.state.selectValues.indexOf(value) > -1) {
      return true
    }
    return false
  }

  render() {
    let item = this.props.navigation.getParam('item', null)
    return (
      <View style={{ height: '100%' }}>
        <Text
          style={styles.title}>{'选择' + item.name}</Text>
        <SectionList
          renderItem={({ item, index }) => this.renderItem(item, this.isSelectValue(item), index)}
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

export default withNavigation(SelectMultiView)

const styles = StyleSheet.create({
  container: {
    paddingLeft: px2dp(30),
    height: px2dp(88),
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7',
    marginTop: px2dp(28),
    marginLeft: px2dp(30)
  },
  name: {
    color: 'black',
    fontSize: px2sp(30)
  }
})
