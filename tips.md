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
