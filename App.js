import React from 'react'
import { Provider } from 'react-redux'
import store from 'src/store'
import App from 'src/Root'
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native'

Reactotron
  .configure({
    name: 'React Native Demo'
  })
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .connect()

global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
