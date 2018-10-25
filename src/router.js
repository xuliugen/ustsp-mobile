import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { THEME_COLOR } from 'src/styles/common'
import { px2sp, px2dp } from 'src/utils/device'

// home
import HomeScreen from 'src/views/home/HomeScreen'
// search
import ProjectSearchScreen from 'src/views/search/ProjectSearchScreen'
import TalentSearchScreen from 'src/views/search/TalentSearchScreen'
import PatentSearchScreen from 'src/views/search/PatentSearchScreen'
// talent
import TalentDetailScreen from 'src/views/talent/TalentDetailScreen'
// project
import ProjectDetailScreen from 'src/views/project/ProjectDetailScreen'
import PublishedProjectsScreen from 'src/views/project/PublishedProjectsScreen.js'
import UndertakenProjectsScreen from 'src/views/project/UndertakenProjectsScreen.js'
// patent
import PatentDetailScreen from 'src/views/patent/PatentDetailScreen'
// news
import NewsSearchScreen from 'src/views/search/NewsSearchScreen'
import NewsDetailScreen from 'src/views/news/NewsDetailScreen'
// my
import MyScreen from 'src/views/my/MyScreen'
import AboutScreen from 'src/views/my/AboutScreen'
import ContactsMgntScreen from 'src/views/contacts/ContactsMgntScreen'
// publish
import PublishScreen from 'src/views/publish/PublishScreen'
import NewsPublishScreen from 'src/views/publish/news/NewsPublishScreen'
import PublishSuccessScreen from 'src/views/publish/PublishSuccessScreen'
import ProjectPublishScreen from 'src/views/publish/project/ProjectPublishScreen'
import ProjectContentSettingScreen from 'src/views/publish/project/ProjectContentSettingScreen'
import ProjectPreviewScreen from 'src/views/publish/project/ProjectPreviewScreen'
// login
import LoginScreen from 'src/views/login/LoginScreen'
// messages
import FriendRequestScreen from 'src/views/messages/FriendRequestScreen'
import InternalMessagesScreen from 'src/views/messages/InternalMessagesScreen'
import ProjectMessagesScreen from 'src/views/messages/ProjectMessagesScreen'
import SystemMessagesScreen from 'src/views/messages/SystemMessagesScreen'
// register
import RegisterUserTypeScreen from 'src/views/register/RegisterUserTypeScreen'
import RegisterAccountScreen from 'src/views/register/RegisterAccountScreen'
import RegisterPasswordScreen from 'src/views/register/RegisterPasswordScreen'
import RegisterEmailScreen from 'src/views/register/RegisterEmailScreen'
import RegisterClaimScreen from 'src/views/register/RegisterClaimScreen'
import RegisterCompleteScreen from 'src/views/register/RegisterCompleteScreen'

const navOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ProjectSearch: { screen: ProjectSearchScreen },
  TalentSearch: { screen: TalentSearchScreen },
  PatentSearch: { screen: PatentSearchScreen },
  NewsSearch: { screen: NewsSearchScreen },
  PatentDetail: { screen: PatentDetailScreen },
  ProjectDetail: { screen: ProjectDetailScreen },
  TalentDetail: { screen: TalentDetailScreen },
  NewsDetail: { screen: NewsDetailScreen }
})

HomeStack.navigationOptions = navOptions

const MessageStack = createMaterialTopTabNavigator(
  {
    FriendRequestScreen: { screen: FriendRequestScreen },
    ProjectNews: { screen: ProjectMessagesScreen },
    SystemMessages: { screen: SystemMessagesScreen },
    InnerMessages: { screen: InternalMessagesScreen }
  },
  {
    initialRouteName: 'FriendRequestScreen',
    backBehavior: 'none',
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        paddingVertical: px2dp(10),
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: px2sp(28)
      },
      indicatorStyle: {
        backgroundColor: THEME_COLOR
      },
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999'
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state
        let label
        switch (routeName) {
          case 'FriendRequestScreen':
            label = '好友申请'
            break
          case 'ProjectNews':
            label = '项目动态'
            break
          case 'SystemMessages':
            label = '系统消息'
            break
          case 'InnerMessages':
            label = '站内信'
        }
        return <Text style={[styles.tabLabel, { color: tintColor }]}>{label}</Text>
      }
    })
  }
)

const ProjectMgntStack = createMaterialTopTabNavigator(
  {
    PublishedProjects: { screen: PublishedProjectsScreen },
    UndertakenProjects: { screen: UndertakenProjectsScreen }
  },
  {
    initialRouteName: 'PublishedProjects',
    backBehavior: 'none',
    tabBarOptions: {
      style: {
        paddingVertical: px2dp(10),
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: px2sp(28)
      },
      indicatorStyle: {
        backgroundColor: THEME_COLOR
      },
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999'
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state
        let label
        if (routeName === 'PublishedProjects') {
          label = '我发布的'
        } else if (routeName === 'UndertakenProjects') {
          label = '我承接的'
        }
        return <Text style={[{ color: tintColor }, styles.tabLabel]}>{label}</Text>
      }
    })
  }
)

const MyStack = createStackNavigator({
  My: { screen: MyScreen },
  About: { screen: AboutScreen },
  TalentDetail: { screen: TalentDetailScreen },
  ProjectDetail: { screen: ProjectDetailScreen },
  ContactsMgnt: { screen: ContactsMgntScreen },
  Messages: {
    screen: MessageStack,
    navigationOptions: ({ navigation }) => ({
      title: '消息中心',
      headerStyle: {
        backgroundColor: '#8d9caa'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      },
      headerRight: <View />
    })
  },
  ProjectMgnt: {
    screen: ProjectMgntStack,
    navigationOptions: ({ navigation }) => ({
      title: '项目管理',
      headerStyle: {
        backgroundColor: '#8d9caa'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      },
      headerRight: <View />
    })
  }
})

MyStack.navigationOptions = navOptions

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Register1: { screen: RegisterUserTypeScreen },
  Register2: { screen: RegisterAccountScreen },
  Register3: { screen: RegisterPasswordScreen },
  Register4: { screen: RegisterEmailScreen },
  RegisterClaim: { screen: RegisterClaimScreen },
  RegisterComplete: { screen: RegisterCompleteScreen }
})

const PublishTabStack = createStackNavigator({
  PublishModal: {
    screen: PublishScreen,
    navigationOptions: {
      header: null
    }
  },
  NewsPublish: { screen: NewsPublishScreen },
  ProjectPublish: { screen: ProjectPublishScreen },
  ProjectContentSetting: { screen: ProjectContentSettingScreen },
  PublishSuccess: {
    screen: PublishSuccessScreen,
    navigationOptions: {
      header: null
    }
  },
  NewsDetail: { screen: NewsDetailScreen },
  ProjectPreview: { screen: ProjectPreviewScreen }
})

PublishTabStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: false
  }
}

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Publish: { screen: PublishTabStack },
    My: { screen: MyStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        let iconSize = 25
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'My') {
          iconName = `ios-options${focused ? '' : '-outline'}`
        } else if (routeName === 'Publish') {
          iconName = `ios-add${focused ? '' : '-outline'}`
          iconSize = 48
          return <View
            style={styles.publishBt}
          >
            <Ionicons name={iconName} size={iconSize} color={'#fff'} />
          </View>
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={iconSize} color={tintColor} />
      },
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state
        let label
        if (routeName === 'Home') {
          label = '首页'
        } else if (routeName === 'My') {
          label = '我的'
        }
        return <Text style={[{ color: tintColor }, styles.tabLabel]}>{label}</Text>
      }
    }),
    // tabBarComponent: TabBarBottom,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999'
    },
    animationEnabled: false,
    swipeEnabled: false
  }
)

const AppNavigator = createStackNavigator(
  {
    App: AppStack,
    Login: LoginStack
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      header: null
    }
  }
)

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    marginBottom: 3
  },
  publishBt: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px2dp(36),
    width: px2dp(98),
    height: px2dp(98),
    backgroundColor: '#3091e6'
  }
})

export default AppNavigator
