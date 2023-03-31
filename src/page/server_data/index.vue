<template>
  <div
      v-loading = "loading"
      element-loading-text="Загрузка данных..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <h3>Данные о пользователях с сервера</h3>
    <el-card>
      <el-row>
        <el-col>
          <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
          <br/>
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
          </el-table>
          <br/>
          <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {inject, reactive, ref} from "vue";
export default {
  name: "dataFromServer_page",
  setup(){
    const loadJson     = inject('loadJson');
    const svg          = inject('svg');
    const notify       = inject('notify');
    const loading      = ref(false);

    const currentPage  = ref(1);
    const pageSize     = ref(10);
    const total        = ref(1000);
    const sort         = reactive({name : 'id', order : 'asc' });
    const tableData = reactive([])

    const handleSizeChange = (val) => {
      pageSize.value = val;
      getData();
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val;
      getData();
    }

    async function getData(){
      loading.value = true;
      let result = await loadJson('/test-task/list', {
        count : pageSize.value,
        page : currentPage.value,
        sort,
      });

      if (result.status === 'success' && result.data) {
        tableData.length = 0;
        total.value = result.data.total;
        result.data.users.forEach(el => tableData.push(el))
      } else notify('Ошибка при получение данных с сервера', result.message, result.status);
      loading.value = false;
    };
    getData()

    return{
      tableData, loading, svg, currentPage, pageSize, total,
      handleCurrentChange, handleSizeChange,
    }
  },
}
</script>

<style scoped>

</style>