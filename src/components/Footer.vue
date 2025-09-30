<template>
  <footer>
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col"></div>
        <div class="col">
          <div class="copyright">
            <span>&#169 2022 By TIyC - Prades S.A.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterVue'
}
</script>

<style>
footer {
  width: 100%;
  /* height: 25px; */
  background: #007c3b;
  bottom: 0;
}

.copyright {
  width: auto;
  height: 100%;
  color: white;
  font-size: 14px;
  text-align: center;
}
</style>