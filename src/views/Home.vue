<!-- Home View -->
<template>
  <div class="home">
    <el-tabs v-model="tab" @tab-click="tabChanged">
      <el-tab-pane label="全部" name="all">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="精华" name="good">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="问答" name="ask">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="招聘" name="job">
        <Content :list="list" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Content from "@/components/Content.vue";
import { getTopics } from "@/utils/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Content
  },
  data() {
    //这里存放数据
    return {
      page: 1,
      limit: 20,
      tab: "all",
      list: [],
      store: {} // 存储所有Tab对应的数据，因为切换Tab后就没必要重新以limit:20加载数据。
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getTopics() {
      getTopics({
        page: this.page,
        limit: this.limit,
        tab: this.tab
      }).then(res => {
        this.list = res.data;
        this.limit = this.limit + 10;

        const store = this.store;
        // 将数据存储到对应的key下
        store[this.tab] = {
          limit: this.limit,
          data: res.data
        };
      });
    },

    scrollMethod() {
      const sumH =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (viewH + scrollH >= sumH) {
        this.getTopics();
      }
    },
    /**
     * 当前Tab变化时判断Store里是否已经存储数据。
     * 是：拉出来，设置到state中
     * 否：重新获取数据
     */
    tabChanged() {
      const store = this.store;

      if (!store[this.tab]) {
        this.limit = 20;
        this.list = [];
        this.getTopics();
        return;
      }

      this.list = store[this.tab].data;
      this.limit = store[this.tab].limit;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTopics();
    window.addEventListener("scroll", this.scrollMethod);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("scroll", this.scrollMethod);
  }, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.home {
  margin: auto;
  width: 75%;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
