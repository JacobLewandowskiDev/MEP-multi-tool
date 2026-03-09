<script setup>
defineProps({
  cardImage: String,
  cardTitle: String,
  cardDescription: String,
  linkPath: String
})

</script>

<template>
 <div class="card">
    <h2 class="card__title"> {{ cardTitle }} </h2>
    <img class="card__img" :src="cardImage" :alt="cardImageAlt" />
    <p class="card__description">{{ cardDescription }}</p>
    <router-link :to="linkPath" class="card__link">Go to {{ cardTitle }}</router-link>
 </div>
</template>

<style scoped>
.card {
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 0.5rem;
    text-align: center;
    width: 300px;
    background-color: var(--background-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.card__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.card__img {
    width: 100%;
    height: auto;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    border: 2px solid var(--border-color);
}

.card__description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.card__link {
    display: inline-block;
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    width: 100%;
    transition: ease-in-out 0.2s;
}

.card__link:hover {
   background-color: var(--primary-color-hover);
}
</style>