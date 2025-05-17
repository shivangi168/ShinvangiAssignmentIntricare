<template>
  <form @submit.prevent="submit">
    <input v-model="form.title" placeholder="Title" required />
    <input v-model="form.price" type="number" placeholder="Price" required />
    <input v-model="form.category" placeholder="Category" required />
    <input v-model="form.image" placeholder="Image URL" required />
    <button type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
    <button v-if="editMode" type="button" @click="cancel">Cancel</button>
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