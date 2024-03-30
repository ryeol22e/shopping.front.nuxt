<template>
  <QPage>
    <div class="q-pa-md absolute-center">
      <h1>sign up</h1>
      <div class="row q-col-qutter-5">
        <div class="colum">
          <div class="col">
            <QInput v-model="data.memberId" type="text" hint="Id" />
          </div>
          <div class="col-10">
            <QInput v-model="data.memberName" type="text" hint="Name" />
          </div>
          <div class="col-10">
            <QInput v-model="data.memberPassword" type="password" hint="Password" />
          </div>

          <div class="col-10">
            <QInput v-model="data.memberAddr" type="text" hint="Address" />
          </div>
          <div class="col-10">
            <QInput v-model="data.memberEmail" type="email" hint="Email" />
          </div>
          <div class="col-10">
            <div class="row">
              <QInput v-model="data.authNumber" type="text" hint="인증번호" />
              <QBtn color="black" label="인증번호 받기" @click="getAuthNumber" />
            </div>
          </div>

          <div class="col">
            <QBtn color="primary" label="Sign up" @click="signUp" />
          </div>
        </div>
      </div>
    </div>
  </QPage>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { usePageLink } from '@/composables/usePageLink';

  const { movePage } = usePageLink();
  const { appSession } = useStorage();
  const { getItem, setItem, removeItem } = appSession();

  const useMember = useStoreMember();
  const data = reactive({
    memberId: ref(''),
    memberPassword: ref(''),
    memberName: ref(''),
    memberEmail: ref(''),
    memberAddr: ref(''),
    authNumber: ref(''),
    tempYn: 'Y',
  });
  const validate = () => {
    if (data.memberId === '') {
      alert('아이디를 입력해주세요.');
      return false;
    }
    if (data.memberPassword === '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    if (data.memberName === '') {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (data.memberEmail === '') {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (data.memberAddr === '') {
      alert('주소를 입력해주세요.');
      return false;
    }

    return true;
  };
  const signUp = async () => {
    if (validate()) {
      const sessionAuthNum = getItem('authNumber');

      if (sessionAuthNum === data.authNumber) {
        data.tempYn = 'N';
        await useMember.signUpProcess(data);
        const signResult = useMember.getSignUpResult;

        if (signResult) {
          alert('가입이 완료되었습니다.');

          removeItem('authNumber');
          movePage('/');
        }
      }
    }
  };
  const getAuthNumber = async () => {
    if (validate()) {
      await useMember.setAuthNumber(data);
      const authNumber = useMember.getAuthNumber;

      setItem('authNumber', authNumber);
      data.authNumber = authNumber;
    }
  };
</script>
