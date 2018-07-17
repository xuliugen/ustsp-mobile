import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { fetchSearchResult, clearSearchResult, setSideMenuOpenState, clearSearchScopePayload } from 'src/actions'

const mapStateToProps = state => ({
  page: state.search.reqPayload.currentPage
})

@connect(mapStateToProps)
export default class FilterMenu extends React.Component {
  handleResetPress = () => {
    this.props.dispatch(clearSearchScopePayload(this.props.scope))
  }
  handleConfirmPress = () => {
    this.props.dispatch(clearSearchResult())
    this.props.dispatch(fetchSearchResult(true))
    this.props.dispatch(setSideMenuOpenState(false))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {this.props.children}
          <View style={{ height: px2dp(88 + 40) }} />
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnReset]} onPress={this.handleResetPress}>
            <Text style={[styles.bottomBtnText, styles.bottomBtnTextReset]}>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnConfirm]} onPress={this.handleConfirmPress}>
            <Text style={[styles.bottomBtnText, styles.bottomBtnTextConfirm]}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: px2dp(30),
    paddingBottom: 0
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(88)
  },
  bottomBtnReset: {
    backgroundColor: '#ddd'
  },
  bottomBtnConfirm: {
    backgroundColor: '#3091e6'
  },
  bottomBtnText: {
    fontSize: px2sp(32)
  },
  bottomBtnTextReset: {
    color: '#8f9ba7'
  },
  bottomBtnTextConfirm: {
    color: '#fff'
  }
})
