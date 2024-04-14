<template>
  <QHeader elevated reveal class="bg-black">
    <QToolbar class="glossy">
      <!-- <q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
				</q-avatar> -->

      <RouterLink to="/" class="text-white">
        <QToolbarTitle>SHOP</QToolbarTitle>
      </RouterLink>
      <!-- <q-btn v-if="isMobile" flat round dense icon="menu" class="q-mr-sm" /> -->
    </QToolbar>
    <QToolbar insert>
      <QBreadcrumbs active-color="primary" style="font-size: 16px">
        <RouterLink class="text-white" v-for="header in headers" :key="header.codeId" :to="{ path: header.addInfo2 }">
          <QBreadcrumbsEl :label="header.codeName" />
        </RouterLink>
        <RouterLink v-if="userRole === MEMBER_CONST.VIP || userRole === MEMBER_CONST.ADMIN" to="/display/vip" class="text-white">
          <QBreadcrumbsEl label="VIP" />
        </RouterLink>

        <div class="absolute-right">
          <RouterLink v-if="!isLogin" to="/login" class="text-white">
            <QBreadcrumbsEl label="Login" />
          </RouterLink>
          <a v-else @click="mypageOpen" href="javascript:void(0);" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Mypage</a>

          <a class="text-white">·</a>

          <RouterLink v-if="!isLogin" to="/signup" class="text-white">
            <QBreadcrumbsEl label="Sign-up" />
          </RouterLink>
          <template v-else>
            <template v-if="userRole === MEMBER_CONST.ADMIN">
              <RouterLink to="/admin/dashboard" class="text-white">
                <QBreadcrumbsEl label="admin" />
              </RouterLink>

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
  import useEnum from '@/composables/useEnum';
  import useLoginManager from '@/composables/useLoginManager';

  import { useStoreCommon } from '@/stores/useStoreCommon';
  import { useStoreMember } from '@/stores/useStoreMember';
  import { computed, ref } from 'vue';

  const { isLogin, userRole } = useLoginManager();
  const { MEMBER_CONST } = useEnum();

  const storeCommon = useStoreCommon();
  const storeMember = useStoreMember();

  const mypageIsShow = ref(false);
  const headers = computed((): any => storeCommon.getHeaders);

  const logout = async () => {
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
