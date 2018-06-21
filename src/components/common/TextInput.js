import React, { Component } from 'react'
import { Platform, TextInput } from 'react-native'

export default class ResolvedTextInput extends Component {
  shouldComponentUpdate(nextProps) {
    return Platform.OS !== 'ios' || this.props.value === nextProps.value
  }
  render() {
    const { inputRef, ...props } = this.props
    return <TextInput ref={inputRef} {...props} />
  }
}
