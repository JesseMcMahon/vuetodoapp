<template>
<div>
    <Navbar></Navbar>
    <img class="main-image" src="../assets/icon2.png">
    <div class="container">
        <input type="text" class="todo-input" placeholder="Enter new todo here" @keyup.enter="addTodo" v-model="newTodo" />
        <div v-for="todo in todoData" :key="todo._id" :todo="todo" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" @click="completeTodo(todo)" v-model="todo.isCompleted" />
                <div v-if="!todo.currentlyEditing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{completed : todo.isCompleted}">{{todo.title}}</div>
                <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEditing(todo)" @keyup.enter="doneEditing(todo)" v-focus />
            </div>
            <div class="remove-item" @click="removeTodo(todo._id)">
                &times;
            </div>  
        </div>

        <div class="info-container">
            <div :class="{congrats: remaining == 0}">
                {{remaining}} tasks remaining
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from "./Navbar"
import VueJwtDecode from "vue-jwt-decode"
import axios from "axios"
export default {
    async mounted() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
            console.log(this.user)
            let todoData = await this.$http.get(`/user/gettodos/${this.user.email}`) //Development
            // let todoData = await axios.get(`/user/gettodos/${this.user.email}`) //Production
            this.todoData = todoData.data.todos
            console.log(this.todoData)
    },
    name: "TodoPage",
    data () {
      return {
        newTodo: '',
        todoData: []
      }
    },
    components: {
        Navbar: Navbar
    },
    computed: {
        remaining() {
            return this.todoData.filter(todo => !todo.completed).length
        }
    },
    methods: {
        created() {
            this.getUserDetails();
        },
        async addTodo() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
            const newestTodo = this.newTodo;
            console.log(newestTodo)
            console.log(this.user)
            console.log("Hello world");
            this.newTodo = ''
            let response = await this.$http.post(`/user/addtodo/${this.user.email}/${newestTodo}`); //Development
            // let response = await axios.post(`/user/addtodo/${this.user.email}/${newestTodo}`); //Production
            this.todoData = response.data.user.currentTodos
        },
        async removeTodo(id) {
               let response = await this.$http.put(`/user/removetodo/${this.user.email}/${id}`) //Development
            // let response = await axios.put(`/user/removetodo/${this.user.email}/${id}`) //Production
            this.todoData = response.data.user.currentTodos
        },
         editTodo(todo) {
           todo.currentlyEditing = true

        },
        completeTodo(todo) {
            // console.log(id)
            // let response = await this.$http.put(`/user/completetodo/${this.user.email}/${id}`)
            // todo.isCompleted = true    
        },
        doneEditing(todo) {
            todo.currentlyEditing = false
        },
        getUserDetails() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
        },
         async getTodos() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
            console.log(this.user)
            let todoData = await this.$http.get(`/user/gettodos/${this.user.email}`) //Development
            // let todoData = await axios.get(`/user/gettodos/${this.user.email}`) //Production
            this.todoData = todoData.data.todos
            console.log(this.todoData)
        },
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
}
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

.remove-item {
    color: black
}
.remove-item:hover {
    cursor: pointer;
    color: red;
    transform: scale(1.3);
    transition: .2s;
}

.todo-item-left {
    display: flex;
    align-items: center;
}

.todo-item-label {
    padding: 10px;
    margin-left: 12px;
}

.todo-item:hover {
    cursor: pointer;
    /* width:100%;
    background-color: #42b883;
    border-radius: 5px;
    transition: .3s; */
}

.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
}

.completed {
    text-decoration: line-through;
    text-decoration-color: #ea5658;
    color: grey;
}

.info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid grey;
    padding-top: 15px;
    margin-bottom: 15px;
}

.congrats {
    color: green;
    transition: .3s;
}

@media only screen and (max-width: 700px) {
    .container {
        max-width: 450px;
    }
}    

@media only screen and (max-width: 500px) {
    .container {
        max-width: 300px;
    }
}
</style>