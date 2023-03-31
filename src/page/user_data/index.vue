<template>
  <div>
    <h3>Данные о пользователях</h3>
    <el-card>
      <el-row>
        <el-col>
          <el-table :data="tableData" style="width: 100%" border max-height="600" stripe>
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="name" label="Имя"/>
            <el-table-column prop="password" label="Пароль" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="admin" label="Администратор">
              <template #default="scope">
                {{scope.row.admin ? 'Да' : 'Нет'}}
              </template>
            </el-table-column>
            <el-table-column prop="birthday" label="День рождения" />
            <el-table-column prop="address" label="Адрес" />
            <el-table-column prop="notes" label="Примечание" />
            <el-table-column label="Действие" width="110" align="center">
              <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="userDelete(scope.$index, scope.row)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <br/>
      <el-row v-if="tableData.length > 0">
        <el-col :span="4">
          <el-button
              class="add-element"
              type="danger"
              @click="deleteAllUsers"
          >
            Удалить всех
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { Delete } from '@element-plus/icons-vue'
import {computed} from "vue";
import  {ElMessageBox }  from 'element-plus';
export default {
  name: "user_data_page",
  setup(){
    const store = useStore();
    const tableData  = computed(() => { return store.getters.registeredUsers});

    function userDelete(idx, row){
      ElMessageBox.confirm(`Вы уверены, что хотите удалить зарегистрированного пользователя - ${row.name} ?`)
          .then(async () => {
            store.commit('deleteUsers', {idx : idx, all : false});
          })
          .catch(() => {
          })
    };

    function deleteAllUsers(){
      ElMessageBox.confirm(`Вы уверены, что хотите удалить всех зарегистрированных пользователей ?`)
          .then(async () => {
            store.commit('deleteUsers', {idx : null, all : true});
          })
          .catch(() => {
          })

    };

    return{
      tableData, Delete,
      userDelete, deleteAllUsers,
    }
  }
}
</script>

<style scoped>

</style>