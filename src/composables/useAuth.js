import { ref } from 'vue'

const user = ref(null)

export const useAuth = () => {
  const setUser = (customer) => {
    if (!customer || typeof customer !== 'object') {
      user.value = null
      return
    }
    user.value = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    }
  }

  const clearUser = () => {
    user.value = null
  }

  /** フロントの表示用ユーザーのみ消す（サーバー sesison は触らない） */
  const logout = () => {
    clearUser()
  }

  return { user, setUser, clearUser, logout }
}
