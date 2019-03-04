import React from 'React'
import StepIndicator from 'react-native-step-indicator'
import { View } from 'react-native'

const labels = ['审核', '报名', '待签单', '正在进行', '待验收', '评价', '完成']
const labelsStopA = ['审核', '甲方中断']
const labelsStopB = ['审核', '乙方中断']
// 甲方中断 13 乙方中断 14
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#1dbbae',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1dbbae',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1dbbae',
  separatorUnFinishedColor: '#8f9ba7',
  stepIndicatorFinishedColor: '#1dbbae',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#1dbbae',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#8f9ba7',
  labelSize: 12,
  currentStepLabelColor: '#1dbbae'
}

const customStylesStop = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ff6b6b',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1dbbae',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1dbbae',
  separatorUnFinishedColor: '#8f9ba7',
  stepIndicatorFinishedColor: '#1dbbae',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ff6b6b',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#8f9ba7',
  labelSize: 12,
  currentStepLabelColor: '#ff6b6b'
}

export default class Steps extends React.Component {
  render() {
    let steps
    if (this.props.position <= 6) {
      steps = <StepIndicator
        customStyles={customStyles}
        labels={labels}
        currentPosition={this.props.position}
        stepCount={7}
      />
    } else if (this.props.position >= 13) {
      steps = <StepIndicator
        customStyles={customStylesStop}
        labels={this.props.position === 13 ? labelsStopA : labelsStopB}
        currentPosition={1}
        stepCount={2}
      />
    }

    return (
      <View>{steps}</View>
    )
  }
}
