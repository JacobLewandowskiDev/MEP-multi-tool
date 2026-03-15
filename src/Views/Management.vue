<script>
import Navbar from "@/Components/Navbar.vue";

export default {
    components: {
        Navbar
    }
}
</script>

<template>
    <Navbar />
    <form class="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form> 
</template>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    padding: 2rem;
    border: var(--tool-border);
    background-color: var(--tool-background-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
}

.login h1 {
    margin-bottom: 1rem;
    letter-spacing: 0.3rem;
}
.login input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 18rem;
    background-color: var(--tool-input-color);
    color: white;
    border: none;
    border-radius: 6px;
    text-align: center;
    font-size: 1rem;
}

.login input::placeholder {
    color: var(--tool-label-color);
}

.login input:focus {
    outline: none;
    border: none;
}

.login button {
    padding:.75rem 3rem;
    background-color: var(--primary-color);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s ease;
    border-radius: 8px;
    border: none;
}

.login button:hover {
    background-color: var(--primary-color-hover);
    color: #000;
}
</style>