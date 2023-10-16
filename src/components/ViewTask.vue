<script setup lang="ts">
import { Modal } from 'flowbite-vue'
import { ref, watch, Ref } from 'vue';
import { useTaskStore } from '../store/tasks/tasks';
import { storeToRefs } from 'pinia';
import { Task } from '../types/Task';

const task: Ref<Task | undefined> = ref(undefined);
const isShowModal: Ref<boolean> = ref(false);

const taskStore = useTaskStore();
const { getTasksById } = storeToRefs(taskStore);

const modal = defineProps<{
  taskId: number
}>()


const showOrClose = (isShow: boolean = true) => {
  isShowModal.value = isShow
};

const loadingTask = () => {
  if (modal.taskId > 0 && isShowModal) task.value = getTasksById.value(modal.taskId);
}

watch(isShowModal, async() => loadingTask())

defineExpose({showOrClose})


</script>
<template>
    <Modal :size="'md'" v-if="isShowModal && modal.taskId" @close="showOrClose(false)">
      <template #header>
        <div class="flex items-center text-lg">
         TASK
        </div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {{ task?.title }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Status:  {{ (task?.isProgress)? 'Em progresso' : (task?.isCompleted) ? "Finalizada": "Cadastrada" }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Data:  {{ task?.date.toLocaleDateString() }}
        </p>
      </template>
    </Modal>
</template>