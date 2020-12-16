<template>
    <div class="nav">
        <!-- <img class="nav-icon" src="../assets/icon.png" /> -->
        <p>ToDo+</p>
        <a class="nav-item" @click="logoutUser">Logout</a>
    </div>
</template>

<script>
export default {
    methods: {
         logoutUser() {
            localStorage.removeItem("jwt");
            this.$router.push("/");
            console.log("Success")
        },
    }
}
</script>

<style scoped>
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    /* background-color: rgb(45, 42, 243); */
    background-color: #1d436c;
    padding: 5px 20px;
}

p {
    letter-spacing: 1px;
    color: #f7bd56;
}

.nav-item {
    color: #f7bd56;
}

.nav-item:hover {
    cursor: pointer;
    color: ivory;
    transition: .2s;
}

.nav-icon {
  margin: 25px 0px;
  height: 40px;
  width: 40px;
}

</style>