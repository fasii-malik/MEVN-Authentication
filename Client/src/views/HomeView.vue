<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoinGeckoTop10 } from '@/composables/useCoinGeko'

const { coins, error, loading, getTopCoins } = useCoinGeckoTop10()

onMounted(() => {
  getTopCoins()
})
</script>

<template>
  <div class="container mt-5">
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
            <p class="card-text fs-5">\${{ coin.current_price.toLocaleString() }}</p>
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
