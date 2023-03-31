<template>
  <div
    v-loading = "loading"
    element-loading-text="Загрузка данных..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <h3>Форма регистрации нового пользователя</h3>
    <el-card>
      <el-row>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            Имя пользователя
          </label>
          <el-input
              v-model="newUser.name"
              :class="['add-element', {'invalid' : errors.name}]"
              placeholder="Введите имя"
          >
          </el-input>
          <small v-if="errors.name">{{errors.name}}</small>
        </el-col>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            Пароль
          </label>
          <el-input
              v-model="newUser.password"
              :class="['add-element', {'invalid' : errors.password}]"
              placeholder="Введите пароль"
          >
          </el-input>
          <small v-if="errors.password">{{errors.password}}</small>
        </el-col>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            Email
          </label>
          <el-input
              v-model="newUser.email"
              :class="['add-element', {'invalid' : errors.email}]"
              placeholder="Введите Email"
          >
          </el-input>
          <small v-if="errors.email">{{errors.email}}</small>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            День рождения
          </label>
          <el-date-picker
              v-model="newUser.birthday"
              class="add-element"
              type="date"
              format="DD.MM.YYYY"
              valueFormat="DD.MM.YYYY"
              placeholder="Выберите дату"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            Адрес
          </label>
          <el-input
              v-model="newUser.address"
              class="add-element"
              placeholder="Введите адрес"
          >
          </el-input>
        </el-col>
        <el-col :span="8" class="el-col-padding-right-15">
          <label class="add-label">
            Примечание
          </label>
          <el-input
              v-model="newUser.notes"
              type="textarea"
              rows="1"
              class="add-element"
              placeholder="Введите примечание"
          >
          </el-input>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="8" class="el-col-padding-right-15">
          <el-button
              class="add-button"
              @click="submit"
          >
            Выполнить вход
          </el-button>
        </el-col>
        <el-col :span="16" class="el-col-padding-right-15" align="right">
          <label style="margin-right: 10px">
            Администратор
          </label>
          <el-switch
              v-model="newUser.admin"
              size="small"
          />
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter} from 'vue-router'
import {ref, inject,reactive, watchEffect} from "vue";
export default {
  name: "login_component",
  setup(){
    const router      = useRouter()
    const store       = useStore();

    const loadJson     = inject('loadJson');
    const svg          = inject('svg');
    const notify       = inject('notify');
    const loading      = ref(false);

    const newUser      = reactive({
      id        : null,
      name      : null,
      password  : null,
      email     : null,
      admin     : false,
      birthday  : null,
      address   : null,
      notes     : null,
    });
    const errors       = reactive({
      name     : null,
      password : null,
      email    : null,
    })

    function validation(){
      let valid = true;
      if (!newUser.name)      {valid = false; errors.name      = 'Необходимо указать имя пользователя!'};
      if (!newUser.password)  {valid = false; errors.password  = 'Необходимо указать пароль!'};
      if (!newUser.email)     {valid = false; errors.email     = 'Необходимо указать Email!'};
      return valid;
    }

    async function submit(){
      if(!validation())return;

      loading.value = true;
      let result = await loadJson('/test-task/create', {...newUser});
      loading.value = false;
      if (result.status === 'success') {
        newUser.id = result.user_id;
        let roles = [];
        newUser.admin ? roles.push('admin') : '';

        store.commit('setLogged', true)
        store.commit('setRoles', roles)
        store.commit('setUser', {name : newUser.name})
        router.back(1);

        store.commit('setRegisteredUsers', newUser)
      }
      notify('Регистрация пользователя', result.message, result.status);
    };

    watchEffect(() => {
      newUser.name      ? errors.name     = null : '';
      newUser.password  ? errors.password = null : '';
      newUser.email     ? errors.email    = null : '';
    })

    return {
      svg, loading, errors, newUser,
      submit
    }
  },
}
</script>

<style scoped>

</style>