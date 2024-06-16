<template>
  <div class="preloader" v-if="loading">
    🍅🥕🍆🍆🥜🥜🐝🌻
  </div>
  <div class="container-fluid">
    <div class="row">
      <div
        class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"
      >
        <div
          class="offcanvas-md offcanvas-end bg-body-tertiary"
          tabindex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">Simple order</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto"
          >
            <ul class="nav flex-column">
              <li class="nav-item">
                <NuxtLink
                  to="/shop/products"
                  class="nav-link d-flex align-items-center gap-2 active"
                  ><i class="bi-house-fill"></i>

                  Prodotti</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/shop/sales"
                  class="nav-link d-flex align-items-center gap-2"
                  ><i class="bi-file-earmark"></i> Finestre di vendita</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/shop/orders"
                  class="nav-link d-flex align-items-center gap-2"
                  ><i class="bi-cart"></i> Ordini</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/shop/clients"
                  class="nav-link d-flex align-items-center gap-2"
                  ><i class="bi-people"></i> Clienti</NuxtLink
                >
              </li>
            </ul>

            <hr class="my-3" />

            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <NuxtLink
                  to="/settings"
                  class="nav-link d-flex align-items-center gap-2"
                  ><i class="bi-gear-wide-connected"></i> Settings</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/logout"
                  class="nav-link d-flex align-items-center gap-2"
                  ><i class="bi-door-closed"></i> Sign out</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    loading: () => {

      let app = useNuxtApp();
      return app.$loader.isLoading()
    }
  }
}
</script>

<style>
.preloader {
  align-items: center;
  background: #dddddd;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.2s linear;
  width: 100%;
  z-index: 9999;
  opacity: 1;
  transform: opacity 1s linear;
}

.bi {
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

/*
 * Sidebar
 */

@media (min-width: 768px) {
  .sidebar .offcanvas-lg {
    position: -webkit-sticky;
    position: sticky;
    top: 48px;
  }
  .navbar-search {
    display: block;
  }
}

.sidebar .nav-link {
  font-size: 0.875rem;
  font-weight: 500;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar-heading {
  font-size: 0.75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
}
</style>
