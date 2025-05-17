<template>
  <form @submit.prevent="submit" class="row g-2 align-items-center mb-3">
    <div class="col">
      <input v-model="form.title" class="form-control" placeholder="Title" required />
    </div>
    <div class="col">
      <input v-model="form.price" type="number" class="form-control" placeholder="Price" required />
    </div>
    <div class="col">
      <input v-model="form.category" class="form-control" placeholder="Category" required />
    </div>
    <div class="col">
      <input v-model="form.image" class="form-control" placeholder="Image URL" required />
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary w-100">{{ editMode ? 'Update' : 'Add' }}</button>
    </div>
    <div class="col-auto" v-if="editMode">
      <button type="button" class="btn btn-secondary w-100" @click="cancel">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['product', 'editMode'])
const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  title: '',
  price: '',
  category: '',
  image: ''
})

watch(() => props.product, (val) => {
  if (val) Object.assign(form.value, val)
}, { immediate: true })

function submit() {
  emit('submit', { ...form.value })
  form.value = { title: '', price: '', category: '', image: '' }
}
function cancel() {
  emit('cancel')
  form.value = { title: '', price: '', category: '', image: '' }
}
</script> 