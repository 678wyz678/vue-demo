/**
 * 一个发布-订阅模式的实现
 * 用来解决两个任意组件间的数据传递（一般是非父子组件，因为父子组件用props更好）
 **/
const eventProxy = {
    onObj: {},//订阅模式用的字典
    oneObj: {},//订阅一次调用的字典, 调用后会删除
    on: function(key, fn) {//订阅
      if (this.onObj[key] === undefined) {
        this.onObj[key] = []//没有键先创建
      }
  
      this.onObj[key].push(fn)//方法放进去
    },
    one: function(key, fn) {//订阅一次，调用一次之后删除
      if (this.oneObj[key] === undefined) {
        this.oneObj[key] = []
      }
  
      this.oneObj[key].push(fn)
    },
    off: function(key) {//关闭订阅
      this.onObj[key] = []
      delete this.onObj[key]
      this.oneObj[key] = []
    },
    trigger: function() {//触发器，发布使用的
      let key, args
      if (arguments.length === 0) {//没有参数直接返回错误
        return false
      }
      key = arguments[0]//第一个参数是 key
      args = [].concat(Array.prototype.slice.call(arguments, 1))//使用call直接调用方法使用,实际上是arguments使用了数组的slice方法

      if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {//检验字典是否存在键值，是否有值
        for (let i in this.onObj[key]) {//遍历当前key的所有方法
          this.onObj[key][i].apply(null, args)//null代表的是this，null就是代表禁用this,
        }
      }
      if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
        for (let i in this.oneObj[key]) {
          this.oneObj[key][i].apply(null, args)
          this.oneObj[key][i] = undefined//调用一次，需要清空
        }
        this.oneObj[key] = []
      }
    }
  }
  
  export default eventProxy
  