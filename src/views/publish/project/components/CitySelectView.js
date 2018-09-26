import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import SelectItem from 'src/views/publish/project/components/SelectItem'

import { withNavigation } from 'react-navigation'
import { EvilIcons } from '@expo/vector-icons'
import { province, city } from 'src/constants/dataset'

const allDatas = []
class CitySelectView extends React.Component {
  state = {
    datas: this.initLocationList()
  }

  initLocationList() {
    let initData = []
    for (let i = 0; i < province.length; i++) {
      initData.push({
        key: i,
        title: province[i],
        show: false,
        data: []
      })
      allDatas.push({
        key: i,
        title: province[i],
        show: false,
        data: city[province[i]].map((item, idx) => ({ext: province[i], value: item}))
      })
    }
    return initData
  }

  onItemHeaderPress = (section) => {
    let newDatas = this.state.datas
    let item = newDatas[section.key]
    if (section.show) {
      item.show = !item.show
      item.data = []
    } else {
      item.show = !item.show
      item.data = allDatas[section.key].data
    }
    this.setState({datas: newDatas})
  }

  saveSelectLocationValue(locationSelectItem) {
    let item = this.props.navigation.getParam('item', null)
    item.cityValue = locationSelectItem.value
    item.provinceValue = locationSelectItem.ext
    item.value = locationSelectItem.ext + ',' + locationSelectItem.value
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
          renderItem={({ item, index, section }) => <SelectItem item={item} key={index} callback={this.saveSelectLocationValue.bind(this)} />}
          renderSectionHeader={({ section }) => (
            <TouchableOpacity style={styles.sectionHeader} onPress={this.onItemHeaderPress.bind(this, section)}>
              <View>
                <Text style={styles.headerTx}>{section.title}</Text>
              </View>
              <View style={{ marginRight: px2dp(10) }}>
                <EvilIcons
                  name="chevron-down"
                  size={25}
                  color="#999" />
              </View>
            </TouchableOpacity>
          )}
          sections={this.state.datas}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

export default withNavigation(CitySelectView)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F5'
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7',
    marginTop: px2dp(28),
    marginLeft: px2dp(30)
  },
  sectionHeader: {
    marginTop: px2dp(20),
    marginBottom: px2dp(20),
    marginLeft: px2dp(30),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTx: {
    fontSize: px2sp(35),
    color: '#8f9ba7'
  }
})
