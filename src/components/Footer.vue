<template>
  <footer>
    <div class="container-fluid d-flex justify-content-center align-items-center h-100">
      <div class="row">
        <div class="col">
          <div class="copyright">
            <span>&#169 2022 - {{ añoActual }} By TIyC - Prades S.A.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterVue',
  data: () => {
    return {
      añoActual: new Date().getFullYear()
    }
  }
}
</script>

<style></style>