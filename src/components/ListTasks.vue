<script setup lang="ts">

import {Task} from '../types/Task';

defineProps<{tasks: Task[]}>()
</script>

<template>
    <ul class="list-none text-base scroll-smooth overflow-y-auto max-h-[60vh]">
        <li class="flex flex-row pt-1 pb-1 bg-lime-50 pl-4 rounded-md mr-2 grid grid-cols-4 gap-2">
            <span class="col-span-2 subpixel-antialiased font-medium">Title</span>
            <span class="">Status</span>
            <span class=""></span>
        </li>
        <li v-for="task of tasks.slice().reverse()" :key="task.id" class="flex flex-row pt-1 pb-1 even:bg-white odd:bg-lime-50 pl-4 rounded-md mr-2 grid grid-cols-4 gap-2">
           <span class="col-span-2 subpixel-antialiased font-medium truncate pr-1">{{ task.title }}</span>
           <span class="justify-center">{{ task.isProgress ? "Em Progresso" : (task.isCompleted ? "Finalizada": "---")}}</span>
           <div class="flex justify-end">
                <button type="button" class="w-[20px] h-[20px] ml-2 mr-2 font-bold hover:text-blue-500" title="In Progress" v-bind:disabled="task.isProgress">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
            </button>
            <button type="button" class="w-[20px] h-[20px] ml-2 mr-2 font-bold hover:text-lime-500" title="Task Completed" v-bind:disabled="!task.isProgress">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button type="button" class="w-[20px] h-[20px] ml-2 mr-2 hover:text-red-500" title="Remove Task">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
            </button>
           </div>
        </li>
    </ul>
</template>