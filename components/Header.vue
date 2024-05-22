<template>
  <QHeader elevated reveal class="bg-black">
    <QToolbar class="glossy">
      <!-- <q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
				</q-avatar> -->

      <NuxtLink to="/" class="text-white" external>
        <QToolbarTitle>SHOP</QToolbarTitle>
      </NuxtLink>
      <!-- <q-btn v-if="isMobile" flat round dense icon="menu" class="q-mr-sm" /> -->
    </QToolbar>
    <QToolbar insert>
      <QBreadcrumbs active-color="primary" style="font-size: 16px">
        <NuxtLink class="text-white" v-if="!isEmpty(headers as Array<any>)" v-for="header of headers" :key="header.codeId" :to="{ path: header.addInfo2 }">
          <QBreadcrumbsEl :label="header.codeName" />
        </NuxtLink>
        <NuxtLink v-if="userRole === MEMBER_CONST.VIP || userRole === MEMBER_CONST.ADMIN" to="/display/vip" class="text-white">
          <QBreadcrumbsEl label="VIP" />
        </NuxtLink>

        <div class="absolute-right">
          <NuxtLink v-if="!isLogin" to="/login" class="text-white">
            <QBreadcrumbsEl label="Login" />
          </NuxtLink>
          <a v-else @click="mypageOpen" href="javascript:void(0);" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Mypage</a>

          <a class="text-white">·</a>

          <NuxtLink v-if="!isLogin" to="/signup" class="text-white">
            <QBreadcrumbsEl label="Sign-up" />
          </NuxtLink>
          <template v-else>
            <template v-if="userRole === MEMBER_CONST.ADMIN">
              <NuxtLink to="/admin/dashboard" class="text-white">
                <QBreadcrumbsEl label="admin" />
              </NuxtLink>

              <a class="text-white">·</a>
            </template>
            <a @click="logout" href="javascript:void(0);" class="text-white">
              <QBreadcrumbsEl label="Logout" />
            </a>
          </template>
        </div>
      </QBreadcrumbs>
    </QToolbar>
  </QHeader>
  <NuxtLoadingIndicator />
</template>

<script setup lang="ts">
  const { isLogin, userRole } = useLoginManager();
  const { MEMBER_CONST } = useEnum();

  const storeCommon = useStoreCommon();
  const storeMember = useStoreMember();

  const mypageIsShow = ref(false);
  const headers = computed<Array<any>>(() => storeCommon.getHeaders);

  const logout = async (): Promise<void> => {
    await storeMember.logoutProcess();
    reloadNuxtApp({ path: '/', force: true });
  };

  const mypageOpen = async (): Promise<void> => {
    await storeCommon.setMypageList();
    mypageIsShow.value = true;
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>
