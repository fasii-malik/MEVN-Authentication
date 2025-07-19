<template>
    <div id="register">
     <div class="container">
           <div class="card card-body mt-4">
            <h3 class="card-title">Register</h3>
            <form @submit.prevent="submit">
              <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input v-model="registerData.username" type="text" class="form-control" id="username">
  </div>
  <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input v-model="registerData.firstName" type="text" class="form-control" id="first_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input v-model="registerData.lastName" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>              
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input v-model="registerData.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input v-model="registerData.password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3">
    <label for="confirmPassword" class="form-label">Confirm Password</label>
    <input v-model="registerData.confirmPassword" type="password" class="form-control" id="exampleInputConfirmPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
</form>
           </div>
     </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore, type RegisterData } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
})

const errorMessage = ref<string>("")

async function submit(){  
  await authStore.register(registerData)
    .then(res => {
      router.replace({name: "login"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

</script>

<style scoped>
#register .card{
  max-width: 40vw;
  margin: auto;
}
</style>