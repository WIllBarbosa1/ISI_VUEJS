<template>
  <div class="about">
    <h1>Task List</h1>
    <div class="form-container">
      <input
        class="form-container__textarea"
        v-model="taskText"
        type="text"
        placeholder="Sua task..."
      />
      <button
        class="submit-btn"
        :disabled="taskText.length < 5"
        @click="handleNewTask"
      >
        Nova Task
      </button>
    </div>
    <div class="list-container">
      <div v-if="taskList.length > 0" class="list-container__wrapper">
        <ListItem
          v-for="(task, index) in taskList"
          :key="`tasnk-${index}`"
          :task="task"
          @OnRemove="handleRemove"
        />
      </div>
      <div v-else>
        <h3>Você não tem tasks registradas</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchGetAllTasks,
  fetchNewTask,
  fetchRemoveTask,
} from "@/services/tasks";
import ListItem from "@/components/ListItem.vue";

export default {
  name: "TaskView",
  data() {
    return {
      taskText: "",
      taskList: [],
    };
  },
  components: { ListItem },
  methods: {
    async handleGetTasks() {
      try {
        const { data } = await fetchGetAllTasks();
        this.taskList = data;
      } catch (error) {
        alert(error);
      }
    },
    async handleRemove({ id }) {
      try {
        await fetchRemoveTask(id);
      } catch (error) {
        alert(error);
      } finally {
        this.handleGetTasks();
      }
    },
    async handleNewTask() {
      try {
        await fetchNewTask(this.taskText);
      } catch (error) {
        alert(error);
      } finally {
        this.taskText = "";
        this.handleGetTasks();
      }
    },
  },
  created() {
    this.handleGetTasks();
  },
};
</script>

<style>
.form-container {
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn {
  padding: 6px 20px;
  border-color: #42b983;
  border: 1px solid #42b983;
  background-color: #fdfffc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  cursor: pointer;
  color: #fdfffc;
  background-color: #42b983;
}

.submit-btn:disabled:hover {
  cursor: not-allowed;
  color: #1010104d;
  background-color: #fdfffc;
}

.form-container__textarea {
  padding: 5px 15px;
  font-size: 1rem;
  outline: none !important;
  border: 1px solid;
}

.form-container__textarea:focus {
  border-color: #42b983;
  border: 1px dashed #42b983;
}

.list-container {
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50vw;
  margin: 0 auto;
  margin-top: 20px;
}

.list-container__wrapper {
  gap: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
