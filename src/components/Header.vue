<template>
<div class='header'>
    <div
        class='info'>
        <a
            href='/'>
            <img
                :src='require("@/assets/image/cnodejs.svg")'
                alt='网站logo'/>
        </a>
        <span
            @click='dialogVisible = true'>
            关 于
        </span>
    </div>
    <el-dialog
        title='关于'
        :visible.sync='dialogVisible'
        width='35%'>
        <div
            class='inside-dialog'>
            <span
                slot='footer'
                class='dialog-footer'>
                <el-button
                    type='primary'
                    @click='dialogVisible = false'>确 定</el-button >
            </span>
        </div>
    </el-dialog>
</div>
</template>
<script>
//顶部组件
export default {
    name: "Header",
    data() {// 注意是方法
        return {
            dialogVisible: false  //控制对话框打开关闭
        };
    }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  background: #444;
  > div.info {
    width: 1200px;
    height: 100%;
    margin: auto;
    a {
      width: 120px;
      height: 50px;
      display: block;
      float: left;
      img {
        padding-top: 10px;
        display: block;
        width: 100%;
      }
    }
    span {
      float: right;
      height: 50px;
      line-height: 50px;
      color: #fff;
      cursor: pointer;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>

