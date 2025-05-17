<template>
  <div>
    <ProductSearch @search="setSearch" @category="setCategory" />
    <ProductForm v-if="showForm" :product="selected" :editMode="editMode" @submit="handleForm" @cancel="resetForm" />
    <button v-if="!showForm" @click="showForm = true">Add Product</button>
    <ProductList :products="filtered" @edit="editProduct" @delete="removeProduct" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchProducts, addProduct, updateProduct, deleteProduct, fetchByCategory } from '../api/products'
import ProductForm from '../components/ProductFrom.vue'
import ProductList from '../components/ProductList.vue'
import ProductSearch from '../components/ProductSearch.vue'

const products = ref([])
const showForm = ref(false)
const editMode = ref(false)
const selected = ref(null)
const search = ref('')
const category = ref('')

const filtered = computed(() => {
  let list = products.value
  if (category.value) list = list.filter(p => p.category === category.value)
  if (search.value) list = list.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
  return list
})

async function loadProducts() {
  const res = await fetchProducts()
  products.value = res.data
}

function setSearch(val) {
  search.value = val
}
async function setCategory(val) {
  category.value = val
  if (val) {
    const res = await fetchByCategory(val)
    products.value = res.data
  } else {
    await loadProducts()
  }
}

function editProduct(product) {
  selected.value = { ...product }
  editMode.value = true
  showForm.value = true
}

function resetForm() {
  showForm.value = false
  editMode.value = false
  selected.value = null
}

async function handleForm(product) {
  if (editMode.value && selected.value) {
    const res = await updateProduct(selected.value.id, product)
    const idx = products.value.findIndex(p => p.id === selected.value.id)
    products.value[idx] = res.data
  } else {
    const res = await addProduct(product)
    products.value.push({ ...product, id: res.data.id || Date.now() })
  }
  resetForm()
}

async function removeProduct(id) {
  await deleteProduct(id)
  products.value = products.value.filter(p => p.id !== id)
}

onMounted(loadProducts)
</script>