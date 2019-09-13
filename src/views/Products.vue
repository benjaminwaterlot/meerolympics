<template>
  <div class="page-wrapper">
    <h1 class="products-page-title">Products page</h1>
    <product-list class="product-list"></product-list>
    <add-product v-if="networkOnLine"></add-product>
    <button @click="logToken">log token</button>
    <button @click="testServer">Test server</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'

export default {
  components: { ProductList, AddProduct },
  computed: mapState('app', ['networkOnLine']),
  methods: {
    ...mapActions('authentication', ['getIdToken']),
    async logToken() {
      console.log(await this.getIdToken())
    },
    async testServer() {
      const idToken = await this.getIdToken()
      console.log('your token is', idToken)
      const { data } = await axios.get(`http://localhost:3000/players/me`, {
        headers: {
          idtoken: await this.getIdToken()
        }
      })
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
