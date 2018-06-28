import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { THEME_COLOR } from './src/styles/common'

// home
import HomeScreen from './src/views/home/HomeScreen'
import ProjectSearchScreen from './src/views/search/ProjectSearchScreen'
import TalentSearchScreen from './src/views/search/TalentSearchScreen'
import PatentSearchScreen from 'src/views/search/PatentSearchScreen'
// talent
import TalentDetailScreen from './src/views/talent/TalentDetailScreen'
// project
import ProjectDetailScreen from './src/views/project/ProjectDetailScreen'
// patent
import PatentDetailScreen from './src/views/patent/PatentDetailScreen'
// news
// import NewsDetailScreen from './src/views/news/NewsDetailScreen'
// my
import MyScreen from './src/views/my/MyScreen'
import LoginScreen from './src/views/login/LoginScreen'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ProjectSearch: { screen: ProjectSearchScreen },
  TalentSearch: {screen: TalentSearchScreen},
  PatentSearch: { screen: PatentSearchScreen },
  TalentDetail: { screen: TalentDetailScreen },
  ProjectDetail: { screen: ProjectDetailScreen },
  PatentDetail: {screen: PatentDetailScreen}
})

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible
  }
}

const MyStack = createStackNavigator({
  My: { screen: MyScreen }
})

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen }
})

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    My: { screen: MyStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'My') {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />
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

export default createStackNavigator(
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
  }
})
