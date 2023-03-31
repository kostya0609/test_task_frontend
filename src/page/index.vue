<template>
  <div>
    <h3>Стартовая страница</h3>
    <el-card>
      Добро пожаловать {{userName}}
    </el-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import {computed} from "vue";
export default {
  name: "start_page",
  setup(){
    const store = useStore();
    const userName    = computed(() => { return store.getters.user.name});
    return{
      userName
    }
  },
}
</script>

<style scoped>

</style>