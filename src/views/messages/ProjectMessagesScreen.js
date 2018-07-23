import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp } from 'src/utils/device'
import { fetchMsgByType } from 'src/ajax/msg'

import ProjectMsgItem from './components/ProjectMsgItem'

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

@connect(mapStateToProps)
@withNavigation
export default class ProjectMessagesScreen extends React.Component {
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
      const { data } = await fetchMsgByType(this.props.userId, 21, curPage, this.state.pageSize)
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
      <View style={styles.container}>
        <FlatList
          data={this.state.msg}
          renderItem={({ item }) => <ProjectMsgItem msg={item} />}
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
