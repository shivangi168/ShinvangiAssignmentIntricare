<template>
  <table class="table table-striped table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Category</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.title }}</td>
        <td>{{ p.price }}</td>
        <td>{{ p.category }}</td>
        <td><img :src="p.image" width="40" /></td>
        <td>
          <button @click="$emit('edit', p)" class="btn btn-sm btn-outline-primary me-2">Edit</button>
          <button @click="$emit('delete', p.id)" class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit', 'delete'])
</script>