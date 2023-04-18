<template>
  <div class="task-container">
    <span>{{ task.content }}</span>
    <button class="remove-btn" @click="handleRemove">Remover</button>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    task: {
      type: Object,
    },
  },
  methods: {
    handleRemove() {
      this.$emit("on-remove", { id: this.task.id });
    },
  },
};
</script>

<style>
.remove-btn {
  padding: 3px 10px;
  border-color: #ef6f6c;
  border: 1px solid #ef6f6c;
  background-color: #fdfffc;
  font-size: 1rem;
  transition: all 0.5s ease;
  margin-left: 10px;
}

.remove-btn:hover {
  cursor: pointer;
  background-color: #f39291;
  color: #fdfffc;
}

.task-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
