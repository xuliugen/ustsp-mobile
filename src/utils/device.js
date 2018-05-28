import { PixelRatio, Dimensions } from 'react-native'

const DP = PixelRatio.get()
const { SCREEN_WIDTH, SCREEN_HEIGHT } = Dimensions.get('window')

export {
  DP,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
}
