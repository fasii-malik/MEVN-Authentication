// src/composables/useCoinGecko.ts
import axios from "axios"
import { ref } from "vue"

export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

const baseURL = "https://api.coingecko.com/api/v3"

export function useCoinGeckoTop10() {
  const coins = ref<Coin[]>([])
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function getTopCoins() {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<Coin[]>(`${baseURL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          sparkline: false
        },
        withCredentials: false
      })
      coins.value = response.data
    } catch (err: any) {
      error.value = err.message || "Failed to fetch coin data"
    } finally {
      loading.value = false
    }
  }

  return {
    coins,
    error,
    loading,
    getTopCoins
  }
}
