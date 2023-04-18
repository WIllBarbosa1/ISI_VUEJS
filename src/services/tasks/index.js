import api from "../instance";

export function fetchGetAllTasks() {
  return api.get("/tasks");
}

export function fetchNewTask(content) {
  return api.post("/tasks", {
    content,
  });
}

export function fetchRemoveTask(id) {
  return api.delete(`/tasks/${id}`);
}
