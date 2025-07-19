<template>

    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{name: 'home'}" class="nav-link" aria-current="page" >Home</router-link>
        </li>       
       
      </ul>
     <div class="collapse navbar-collapse">
  <ul class="navbar-nav ms-auto text-center">
    <li v-if="isAuthenticated" class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {{ user.username }}
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <router-link :to="{ name: 'user' }" class="dropdown-item">Profile</router-link>
        </li>
        <li>
          <button @click="logout" class="dropdown-item btn btn-danger">Logout</button>
        </li>
      </ul>
    </li>

    <template v-else>
      <li class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
      </li>
    </template>
  </ul>
</div>

    </div>
  </div>
</nav>

</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()

const router = useRouter()

const user = computed(()=>{
  return authStore.user
})

const isAuthenticated = computed(()=>{
  return authStore.isAuthenticated
})

async function logout(){
  await authStore.logout()
    .then( res => {
      router.replace({name: 'home'})
    })
    .catch(err => {
      console.log(err.message)
    })
}

</script>