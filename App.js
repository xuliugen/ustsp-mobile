import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { THEME_COLOR } from './src/styles/common'

import { HomeScreen } from './src/views/home'
import MyScreen from './src/views/MyScreen'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen }
})

const MyStack = createStackNavigator({
  My: { screen: MyScreen }
})

export default createBottomTabNavigator(
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

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    marginBottom: 3
  }
})
