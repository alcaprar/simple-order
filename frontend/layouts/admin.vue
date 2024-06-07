<template>
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
                <a
                  class="nav-link d-flex align-items-center gap-2 active"
                  aria-current="page"
                  href="#"
                >
                  <i class="bi-house-fill"></i>

                  Prodotti
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="bi-file-earmark"></i>
                  Finestre di vendita
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="bi-cart"></i>
                  Ordini
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="bi-people"></i>
                  Clienti
                </a>
              </li>
            </ul>

            <hr class="my-3" />

            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="bi-gear-wire-connected"></i>
                  Settings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="bi-door-closed"></i>
                  Sign out
                </a>
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

<style>
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
