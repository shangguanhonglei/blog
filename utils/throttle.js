/*
 * @Author: tianll 
 * @Date: 2019-09-25 15:56:08 
 * @Last Modified by: tianll
 * @Last Modified time: 2019-09-25 16:10:04
 */
/**
 * 函数节流，连续操作过程中以固定的时间间隔间断的执行
 * throttle(func,1000) 在连续操作过程中每隔1000ms执行一次,当操作开始立即触发第一次
 * throttle(func,1000,{leading: false}) 操作开始不会立即触发，第一次触发是在1000ms之后
 * throttle(func,1000,{trailing: false}) 最后一次回调不会触发
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 */
var throttle = function(func, wait, options) {
  var context, args, result;

  // setTimeout 的 handler
  var timeout = null;

  // 标记时间戳
  // 上一次执行回调的时间戳
  var previous = 0;

  // 如果没有传入 options 参数
  // 则将 options 参数置为空对象
  if (!options)
    options = {};

  var later = function() {
    // 如果 options.leading === false
    // 则每次触发回调后将 previous 置为 0
    // 否则置为当前时间戳
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    // console.log('B')
    result = func.apply(context, args);

    // 这里的 timeout 变量一定是 null 了吧
    // 是否没有必要进行判断？
    if (!timeout)
      context = args = null;
  };

  // 以滚轮事件为例（scroll）
  // 每次触发滚轮事件即执行这个返回的方法
  // _.throttle 方法返回的函数
  return function() {
    // 记录当前时间戳
    var now = +new Date();

    // 第一次执行回调（此时 previous 为 0，之后 previous 值为上一次时间戳）
    // 并且如果程序设定第一个回调不是立即执行的（options.leading === false）
    // 则将 previous 值（表示上次执行的时间戳）设为 now 的时间戳（第一次触发时）
    // 表示刚执行过，这次就不用执行了
    if (!previous && options.leading === false)
      previous = now;

    // 距离下次触发 func 还需要等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后便会把 previous 值迅速置为 now
    // ========= //
    // remaining > wait，表示客户端系统时间被调整过
    // 则马上执行 func 函数
    // @see https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs
    // ========= //

    // console.log(remaining) 可以打印出来看看
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        // 解除引用，防止内存泄露
        timeout = null;
      }

      // 重置前一次触发的时间戳
      previous = now;

      // 触发方法
      // result 为该方法返回值
      // console.log('A')
      result = func.apply(context, args);

      // 引用置为空，防止内存泄露
      // 感觉这里的 timeout 肯定是 null 啊？这个 if 判断没必要吧？
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }

    // 回调返回值
    return result;
  };
};