<template>
  <div id="user">
  <div class="container mt-5 mb-5">
    <div v-if="user" class="card shadow-lg p-4 rounded-4 bg-dark text-light border-0">
      <h4 class="card-title mb-3 text-info">
        <i class="bi bi-person-circle me-2"></i>@{{ user.username }}
      </h4>
      <hr class="border-secondary" />
      <div class="mb-2">
        <strong>Email:</strong>
        <p class="mb-1 ">{{ user.email }}</p>
      </div>
      <div class="mb-2">
        <strong>First Name:</strong>
        <p class="mb-1">{{ user.firstName }}</p>
      </div>
      <div>
        <strong>Last Name:</strong>
        <p class="mb-1">{{ user.lastName }}</p>
      </div>
    </div>
  </div>
</div>

<hr>

   <div class="container mt-5 mb-5">
    <h1 class="text-center mb-4">Cryptocurrencies</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">{{ error }}</div>

    <div v-else class="row g-4">
      <div v-for="coin in coins" :key="coin.id" class="col-md-4 col-lg-3">
        <div class="card text-center shadow h-100 border-primary">
          <div class="card-body">
            <img :src="coin.image" :alt="coin.name" class="mb-3" style="width: 40px; height: 40px;" />
            <h5 class="card-title">{{ coin.name }}</h5>
            <p class="card-text fs-5">${{ coin.current_price.toLocaleString() }}</p>
            <span
              :class="['badge', coin.price_change_percentage_24h >= 0 ? 'bg-success' : 'bg-danger']"
            >
              {{ coin.price_change_percentage_24h.toFixed(2) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { computed, onMounted } from 'vue';
import { useCoinGeckoTop10 } from '@/composables/useCoinGeko'

const { coins, error, loading, getTopCoins } = useCoinGeckoTop10()

const authStore = useAuthStore()

const user = computed(()=>{
  return authStore.userDetail
})

async function getUser(){
  await authStore.getUser()
}

onMounted(async ()=>{
  await getUser();
  getTopCoins()
})


</script>

<style scoped>
#user .card{
  max-width: 40vw;
  margin: auto;
}

  .card{
    background-color: #22201f;
    cursor: pointer;
  }
  .card-body{
    Color: #eceff7;
  }
</style>
