主要是总结下做项目时，需要注意的点或是发现的小技巧

# 单位
尺寸单位是 dp, 从 psd 设计稿获得尺寸数值后，要使用 `px2dp()` 转换下尺寸数值

# 如何用 borderRadius 写个圆形
百分比不可用，只能使用数值。首先确保 width 和 height 值相等，borderRadius 的值为 width 的一半，如
``` js
var styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
```

# Packager unable to resolve module from /Users/node_modules/
> https://github.com/facebook/react-native/issues/4968/

1. Delete the node_modules folder - rm -rf node_modules && npm install
2. Reset packager cache - rm -fr $TMPDIR/react-* or node_modules/react-native/packager/packager.sh --reset-cache
3. Clear watchman watches - watchman watch-del-all

# Android Studio: “Please select Android SDK”
> https://stackoverflow.com/questions/34353220/android-studio-please-select-android-sdk

# Detached iOS (ExpoKit) build fails with FBNativeAd error
> https://github.com/expo/expo/issues/1868

1. Change your Podfile so that your ExpoKit tag points to ios/2.6.5 instead of 2.6.4.
2. pod install
3. Try building again
