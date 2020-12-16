<template>
    <div class="todo-item">
         <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed" />
                <div v-if="!todo.currentlyEditing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{completed : todo.completed}">{{todo.title}}</div>
                <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEditing(todo)" @keyup.enter="doneEditing(todo)" v-focus />
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div> 
    </div>
</template>

<script>
export default {
    name: "todo-item",
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border-radius: 5px;
}

.todo-item {
    margin-bottom: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>