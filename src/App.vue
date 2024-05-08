<template>
  <h1>Hello App!</h1>
  <p><span class="font-bold">Current route path:</span> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <router-view :key="$route.fullPath" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>
