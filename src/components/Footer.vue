<template>
    <footer>
      <div class="container-fluid">
        <div class="row row-cols-2">
          <div class="col"></div>
          <div class="col">
            <div class="copyright">
              <p>&#169 2022 By TIyC - Prades S.A.</p>
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
footer{
    width: 100%;
    height: 30px;
    background: #008645;
    bottom: 0;
    position: flex;
}

.copyright{
  width: auto;
  height: 25px;
  color: white;
  font-size: 14px;
  text-align: center;
}
</style>