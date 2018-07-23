import React from 'react'
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp } from 'src/utils/device'
import { fetchMsgByType } from 'src/ajax/msg'

import RequestItem from './components/RequestItem'

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

@connect(mapStateToProps)
@withNavigation
export default class FriendRequestScreen extends React.Component {
  state = {
    msgs: [],
    curPage: 1,
    pageSize: 50,
    totalNum: 0
  }

  componentDidMount() {
    this.fetchMsg()
  }

  async fetchMsg(append = true) {
    let { curPage, pageSize } = this.state
    try {
      if (append) {
        const { data } = await fetchMsgByType(this.props.userId, 11, curPage, pageSize)
        this.setState(prev => ({
          msgs: prev.msgs.concat(data.data),
          totalNum: data.totalNum,
          curPage: prev.curPage + 1
        }))
      } else {
        const { data } = await fetchMsgByType(this.props.userId, 11, 1, pageSize)
        this.setState(prev => ({
          msgs: data.data,
          totalNum: data.totalNum,
          curPage: prev.curPage + 1
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  onEndReach() {
    const { curPage, pageSize, totalNum } = this.state
    if (curPage <= Math.ceil(totalNum / pageSize)) {
      this.fetchMsg()
    }
  }

  render() {
    return (
      <View style={styles.conatiner}>
        <FlatList
          data={this.state.msgs}
          renderItem={({ item }) => <RequestItem msg={item} refreshList={this.fetchMsg.bind(this, false)} />}
          keyExtractor={(item) => item.id}
          onEndReach={this.onEndReach()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: px2dp(30),
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
