<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div v-if="!isEmpty(list as Array<any>)" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <NuxtLink v-for="item in list" :key="item.prdtNo" :to="`/product/${item.prdtNo}`">
          <div class="col">
            <div class="card shadow-sm">
              <img v-if="!isEmpty(item.image)" :src="`data:image/png;base64,${item.image}`" alt="" height="225" />
              <svg v-else class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
              </svg>

              <div class="card-body">
                <h5 class="text-black">{{ item.prdtName }}</h5>
                <p class="card-text text-black">판매가 : {{ insertComma(item.sellPrice) }}원</p>
                <div class="d-flex justify-content-between align-items-center">
                  <!-- <div class="btn-group">
										<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
										<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
									</div>
									<small class="text-muted">9 mins</small> -->
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <h1 v-else>등록된 상품이 없습니다.</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUtils } from '@/composables/useUtils';

  const { isEmpty, insertComma } = useUtils();
  const storeProduct = useStoreProduct();

  const list = computed<Array<any>>(() => storeProduct.getList);
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.15);
    border-width: 1px 0;
    box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
  }

  .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
  }

  .bi {
    vertical-align: -0.125em;
    fill: currentColor;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
</style>
