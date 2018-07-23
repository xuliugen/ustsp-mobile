import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp } from 'src/utils/device'
import { fetchMsgByType } from 'src/ajax/msg'

import SystemMsgItem from './components/SystemMsgItem'

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class SystemMessagesScreen extends React.Component {
  state = {
    msg: [],
    pageSize: 50,
    curPage: 1,
    total: 0
  }

  componentDidMount() {
    this.fetchMessage()
  }

  async fetchMessage(curPage = 1) {
    try {
      const { data } = await fetchMsgByType(this.props.userId, 1, curPage, this.state.pageSize)
      this.setState({
        msg: data.data,
        curPage: curPage + 1,
        total: data.totalNum
      })
    } catch (error) {
      console.log(error)
    }
  }

  onEndReach() {
    const { curPage, pageSize, totalNum } = this.state
    if (curPage <= Math.ceil(totalNum / pageSize)) {
      this.fetchMessage(curPage)
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.msg}
          renderItem={({ item }) => <SystemMsgItem msg={item} refreshList={this.fetchMessage.bind(this)} />}
          keyExtractor={(item) => item.id}
          onEndReach={this.onEndReach()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: px2dp(30),
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
