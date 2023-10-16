import { watch } from 'vue';
import { modal, isShowModal } from './ViewTask.vue';

watch(modal.taskId, () => {
isShowModal.value = modal.taskId > 0;
});
