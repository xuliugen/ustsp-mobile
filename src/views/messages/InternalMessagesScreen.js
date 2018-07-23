import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { px2dp } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { fetchMsgByType } from 'src/ajax/msg'
import InternalMsgItem from './components/InternalMsgItem'

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class InternalMessagesScreen extends React.Component {
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
      const { data } = await fetchMsgByType(this.props.userId, 51, curPage, this.state.pageSize)
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
          renderItem={({ item }) => <InternalMsgItem msg={item} refreshList={this.fetchMessage.bind(this)} />}
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
