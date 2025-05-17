<template>
  <div class="row g-2 align-items-center mb-3">
    <div class="col">
      <input v-model="search" class="form-control" placeholder="Search by title..." @input="onSearch" />
    </div>
    <div class="col-auto">
      <select v-model="category" class="form-select" @change="onCategory">
        <option value="">All</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['search', 'category'])
const search = ref('')
const category = ref('')
const categories = ref([])

function onSearch() {
  emit('search', search.value)
}
function onCategory() {
  emit('category', category.value)
}

onMounted(async () => {
  const res = await axios.get('https://fakestoreapi.com/products/categories')
  categories.value = res.data
})
</script>