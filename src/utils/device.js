import { PixelRatio, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const PIXEL_DENSITY = PixelRatio.get()
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const STATUS_BAR_HEIGHT = getStatusBarHeight()

function px2dp(px) {
  return px / 2
}

function px2sp(px) {
  return px / 2
}

export {
  PIXEL_DENSITY,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  px2dp,
  px2sp
}
