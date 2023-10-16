<script setup lang="ts">
    import { Ref, ref } from 'vue';
    const emit = defineEmits(['saveTask']);

    const newTask: Ref<string> = ref('');
    function submit() {
        if (newTask.value === null || newTask.value.length < 1) return
        emit('saveTask', newTask.value)
        newTask.value = ''
    }
</script>
<template>
    <div class="pb-5 flex border-b-lime-600 border-solid">
        <input name="taskInput" v-model="newTask" placeholder="Enter with title task" alt="Title task" @keyup.enter="submit"
            class="placeholder:text-slate-400 block bg-white w-full border
             border-slate-300 rounded-md pl-1 py-1 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-[1em]"/>
    </div>
</template>