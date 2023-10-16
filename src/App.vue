<script setup lang="ts">
  import { Ref, ref } from 'vue';
  import { Task } from './types/Task';
  import ListTasks from './components/ListTasks.vue';
  import InputTask from './components/InputTask.vue';
  import ListEmpty from './components/ListEmpty.vue';
  import ViewTask from './components/ViewTask.vue';
  import { useTaskStore } from './store/tasks/tasks';
  import { storeToRefs } from 'pinia';

  const taskModal = ref();
  const taskStore = useTaskStore();
  const { tasks } = storeToRefs(taskStore);
  const title: Ref<string> = ref('Tasks');
  const taskView: Ref<number> = ref(0);

  function saveTask(task: string) {
    if (!task) return;
    if (task.length <= 1) return;

    tasks.value.push({id: tasks.value.length + 1, title: task, date: new Date(), isCompleted: false, isProgress: false })
  }


  function viewTask(taskId: number) {
    if (taskId < 0 || taskId === undefined) return;

    taskView.value = taskId
    if (taskModal.value !== null) taskModal.value.showOrClose();
  }

  function startTask(taskId: number) {
    if (taskId < 0 || taskId === undefined) return;

    const task: Task | undefined = searchTaskById(taskId);

    if (task) {
      task.isProgress = true;
      task.isCompleted = false;
    }
  }

  function completedTask(taskId: number) {
    if (taskId < 0 || taskId === undefined) return;

    const task: Task | undefined = searchTaskById(taskId);

    if (task) {
      task.isProgress = false; 
      task.isCompleted = true;
    }
  }

  function removeTask(taskId: number) {
    if (taskId < 0 || taskId === undefined) return;

    try {
      tasks.value.splice(tasks.value.findIndex((task: Task) => task.id === taskId), 1);
    } catch (error) {
      alert('Não foi possível remover a task!')
    }
  }

  function searchTaskById(taskId: number): Task | undefined {
    return tasks.value.find((task: Task) => task.id === taskId);
  }

</script>

<template>
  <div class="container mt-10 rounded-lg border-solid border-2 border-lime-400 max-h-[80vh] min-h-[75vh]">
    <h1 class="text-3xl font-bold text-white pt-2 pl-2 pb-2 bg-lime-400 flex flex-row">
      <span class="w-[45px] h-[45px] flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
        </svg>
      </span>
      <span class="m-2">{{title}}</span>
    </h1>
    <div class="p-4 box-border">
      <InputTask @saveTask="(task) => saveTask(task)"/>
      <ListTasks 
        v-if="tasks.length > 0"
        :tasks="tasks" 
        @viewTask="(id: number) => viewTask(id)"
        @startTast="(id: number) => startTask(id)"
        @removeTask="(id: number) => removeTask(id)"
        @completedTask="(id: number) => completedTask(id)"
      />
      <ListEmpty v-else/>
    </div>
  </div>
  <ViewTask :taskId="taskView" ref="taskModal"/>
</template>