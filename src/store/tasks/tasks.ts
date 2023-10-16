import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { Task } from '../../types/Task';

type State = {
    tasks: Task[]
}

const STORE_NAME = 'tasks'
export const useTaskStore = defineStore(STORE_NAME, {
    state: () => (
        useStorage<State>(STORE_NAME, {tasks: []})
    ),
    getters: {
        getTasksById: (state) => {
            return (taskId: number) => state.tasks.find((task: Task) => task.id === taskId)
        },
    },
    actions: {

    }
})
