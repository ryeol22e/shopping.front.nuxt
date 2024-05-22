<template>
  <QPage class="flex flex-center bg-grey-2">
    <QCard class="q-pa-md shadow-2 my_card" bordered>
      <QCardSection class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </QCardSection>
      <QCardSection>
        <QInput dense outlined v-model="data.memberId" label="loginID" name="memberId"></QInput>
        <QInput dense outlined class="q-mt-md" v-model="data.memberPassword" type="password" label="Password" name="memberPassword" @keyup.enter="loginProcess"></QInput>
      </QCardSection>
      <QCardSection>
        <QBtn style="border-radius: 8px" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" @click="loginProcess"></QBtn>
      </QCardSection>
      <QCardSection class="text-center q-pt-none">
        <div class="text-grey-8">Don't have an account yet? <NuxtLink to="/signup" class="text-dark text-weight-bold" style="text-decoration: none">Sign up.</NuxtLink></div>
      </QCardSection>
    </QCard>
  </QPage>
</template>

<script setup lang="ts">
  const { isEmpty } = useUtils();
  const { appLocalStorage } = useStorage();
  const { getItem, setItem } = appLocalStorage();

  const storeMember = useStoreMember();

  const remember = ref(false);
  const data: MemberInfo = reactive({
    memberId: ref(''),
    memberPassword: ref(''),
  });

  const loginProcess = async () => {
    if (validate()) {
      await storeMember.loginProcess(data);

      if (storeMember.isLogin) {
        if (remember.value) {
          setItem('memberId', data.memberId);
        }

        reloadNuxtApp({ path: '/', force: true });
      } else {
        alert('로그인에 실패했습니다.');
        return false;
      }
    }
  };
  const validate = () => {
    if (data.memberId === '') {
      alert('아이디를 입력해주세요.');
      return false;
    }
    if (data.memberPassword === '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }

    return true;
  };

  definePageMeta({
    key: (route) => route.fullPath,
  });
  onMounted(() => {
    data.memberId = isEmpty(getItem('memberId')) ? '' : getItem('memberId');
    remember.value = isEmpty(data.memberId);
  });
</script>
