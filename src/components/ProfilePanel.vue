<template>
  <div class="panel">
      <router-link class="user" :to="{path:'/user/' + user.lognname }">
        <img :src="user.avatar_url" alt="用户头像">
        <span>{{user.loginname}}</span>
      </router-link>
      <div>积分： {{ user.score }}</div>
      <div>
          Github:
          <a :href='"https://github.com/"+user.githubUsername' target="_blank" rel="nofollow noopener noreferrer">
          {{ user.githubUsername }}
          </a>
      </div>
      <div>
          注册时间：
          {{ $moment(user.create_at, 'YYYY-MM-DD')
          .startOf('day')
          .fromNow() }}
      </div>
  </div>
</template>

<script>
import {getUserByName} from "@/utils/api.js"
import eventProxy from "@/utils/eventProxy.js";

export default {
    name:'ProfilePanel',
    props: ["loginname"],
    data() {
        return {
            user:{}
        }
    },
    methods:{
        fetchData(loginname){
            getUserByName(loginname)
            .then(res =>{
                this.user = res.data
                eventProxy.trigger("user", res.data)
            })
        }
    },
    created(){
        if (!this.loginname) {
            return;
        }
        this.fetchData(this.loginname)
    },
    /**
   * 监听props和data中的值是否有变化的钩子
   */
    watch:{
        loginname(loginname){
            if (!loginname) {
                return;
            }
        this.fetchData(loginname)
        }
    }
}
</script>

<style lang="scss" scoped>
.panel{
    display: flex;
    flex-direction: column;
    color: black;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    > a {
        display: flex;
        place-items: center;
        img{
            width: 48px;
            height: 48px;
            border-radius: 5px;
            margin-right: 20px;
        }
    }
    .user{
        margin-bottom: 10px;
    }
}

</style>
