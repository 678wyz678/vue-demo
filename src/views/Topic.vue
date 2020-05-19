<!-- Topic View -->
<template>
  <div class="topic">
    <div class="left">
      <div class="title" v-html='topic.title'></div>
      <div class="info">
        <span>
          发布于&nbsp;
          {{$moment(topic.create_at, 'YYYY-MM-DD')
          .startOf('day')
          .fromNow()}}
          &nbsp;•&nbsp;
        </span>
        作者：
        <router-link :to="{path: '/user/' + topic.loginname}">
        {{topic.loginname}}
        </router-link>
        &nbsp;•&nbsp;
        <span>
          {{topic.visit_count}}次浏览&nbsp;•&nbsp;
        </span>
        <span>
          来自：
          {{$tab[topic.tab] && $tab[topic.tab].name}}
        </span>
      </div>
      <Divider />
      <div class="content" v-html="topic.content" />
      <Reply :data='topic.replies'/>
    </div>
    <div class="right">
      <ProfilePanel :loginname='topic.loginname' />
      <OtherTopic />
      <RecentReply />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getTopicById } from "@/utils/api.js";
import OtherTopic from "@/components/OtherTopic.vue";
import RecentReply from "@/components/RecentReply.vue";
import Reply from "@/components/Reply.vue";
import Divider from "@/components/Divider.vue";
import ProfilePanel from "@/components/ProfilePanel.vue";

export default {
  name: "Topic",
  //import引入的组件需要注入到对象中才能使用
  components: {
    OtherTopic,
    RecentReply,
    Reply,
    Divider,
    ProfilePanel
  },
  data() {
    //这里存放数据
    return {
      topic: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fetchData(id) {
      getTopicById(id).then(res => {
        this.topic = {
          ...res.data,
          ...res.data.author //解包res.data.author和res.data，使他们合并
        };
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.fetchData(this.$route.params.id);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  /**
   * 在当前路由改变，但是该组件被复用时调用
   * 举例来说，对于一个带有动态参数的路径 /topic/:id，在 /topic/asdsd 和 /topic/sdfsdfa 之间跳转的时候，
   * 由于会渲染同样的 Topic 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
   * 可以访问组件实例 `this`
   */
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
$grey-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

.topic {
  display: flex;
  text-align: left;
  margin-bottom: 100px;
  .title {
    color: black;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 8px;
  }
  .content {
    color: #333;
    line-height: 1.6;
    margin-bottom: 50px;
    /deep/ img {
      width: 100%;
    }
  }
  .left {
    width: 72%;
    float: left;
    box-shadow: $grey-shadow;
    padding: 20px;
    .info {
      display: flex;
      align-items: center;
      color: #838383;
      font-size: 12px;
    }
  }
  .right {
    float: right;
    width: 25%;
    height: 100%;
    margin-left: 2%;
  }
}
li{
  list-style: none;
}

</style>

