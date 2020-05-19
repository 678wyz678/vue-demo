<template>
  <div class="user">
  <ProfilePanel :loginname='loginname'/>
  <OtherTopic :simple='false' />
  <RecentReply :simple='false' />
  </div>
</template>

<script>
import ProfilePanel from "@/components/ProfilePanel.vue";
import RecentReply from "@/components/RecentReply.vue";
import OtherTopic from "@/components/OtherTopic.vue";

export default {
  name: "User",
  data() {
    return {
      loginname: ""
    };
  },
  created(){
      this.loginname = this.$route.params.id;
  },
  beforeRouteUpdate(to, from, next) {
    this.loginname = to.params.id;
    next();
  },
  components: {
    ProfilePanel,
    RecentReply,
    OtherTopic
  }
};
</script>

<style scoped>
.user {
  width: 75%;
  margin: auto;
}
</style>
