<template>
  <div class="header-profile">
    <!-- login -->
    <transition
      appear
      name="animate__animated animate__fade"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
    >
      <div class="card" v-show="loserwd">
        <div class="tools">
          <div class="circle">
            <span @click="closewindow" class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <el-tabs v-model="activeName" class="login-tabs">
            <!-- email -->
            <el-tab-pane label="手机密码" name="first">
              <div class="demo-login">
                <input type="text" v-model="phone" class="demo-text" placeholder="请输入手机号" />
                <input
                  type="password"
                  v-model="password"
                  class="demo-text"
                  placeholder="请输入密码"
                />
                <div class="input-text">
                  <button @click="lg_submit">Click me</button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="手机短信" name="second">
              <!-- 短信 -->
              <div class="demo-login">
                <input type="text" v-model="phone" class="demo-text" placeholder="请输入手机号" />
                <div class="lg-mgt">
                  <input
                    type="text"
                    v-model="shotmsg"
                    class="demo-text"
                    placeholder="请输入验证码"
                    style="width: 130px"
                  />
                  <button @click="">{{ codemsg }}</button>
                </div>
                <div class="input-text">
                  <button @click="lg_submit">Click me</button>
                </div>
              </div>
            </el-tab-pane>
            <!-- Cookie -->
            <el-tab-pane label="Cookie" name="third">
              <div class="demo-login">
                <input type="text" v-model="cok" class="demo-text" placeholder="请输入Cookie" />
                <div class="input-text">
                  <button @click="lg_submit">Click me</button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts" name="Login">
// import md5_password from '@/utils/md5_password.js';
import { useLoginStatus } from '@h/login';
import useApi from '@/api';
const { user } = useApi();
let { loserwd } = useLoginStatus();
// login
let activeName = $ref('first');
let phone = $ref('');
let password = $ref('');
let shotmsg = $ref();
let cok = $ref();
let type = $ref(1);
let codemsg: any = ref('发送验证码');

watch(
  () => activeName,
  () => {
    switch (activeName) {
      case 'first':
        type = 1;
        break;
      case 'second':
        type = 2;
        break;
      case 'third':
        type = 3;
        break;
      default:
        break;
    }
  }
);

const lg_submit = async () => {
  if (type == 1) {
    let ret = await user.reqPasswordLogin({ phone, password });
    console.log(ret);
  } else if (type == 2) {
    // userlogin({
    //     phone: phone.value,
    //     captcha: shotmsg.value
    // }).then(res => {
    //     store.commit("setuserid", res.data.profile.userIds)
    //     router.push({ path: "/" })
    // })
  } else if (type == 3) {
    // store.commit("setTOKEN_KEY", cok.value)
    // router.push({ path: "/" })
  }
};

const sendcode = () => {
  // getuserverion({
  //     phone: phone.value,
  // }).then(res => {
  //     console.log(res);
  //     //定义n=5秒
  //     let n = 60
  //     //定义定时器time
  //     let time = setInterval(() => {
  //         //禁用
  //         //改变倒计时文字提示
  //         codemsg.value = n
  //         n--
  //         //如果n<0，清除定时器，禁用状态取消，文字提示为空（不显示）
  //         if (n < 0) {
  //             codemsg.value = "发送验证码"
  //             clearInterval(time)
  //         }
  //     }, 1000)
  // })
};

const closewindow = () => {
  loserwd.value = false;
};
</script>

<style lang="scss" scoped>
.demo-login {
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  .demo-text {
    height: 35px;
    margin: 10px 0px;
    border: 1px solid rgba(113 119 144 / 25%);
    border-radius: 10px;
    padding-left: 10px;
    & :active {
      box-shadow: 0 5px 16px rgb(0 0 0 / 10%);
    }
    &::placeholder {
      font-family: 'Poppins', sans-serif;
      color: rgb(113 119 144 / 78%);
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.login-tabs {
  margin-top: 20px;
}
.input-text button {
  font-size: 16px;
  padding: 1em 3.3em;
  transform: perspective(200px) rotateX(15deg);
  color: white;
  font-weight: 900;
  border: none;
  border-radius: 5px;
  background: linear-gradient(0deg, rgba(63, 94, 251, 1) 0%, rgba(70, 135, 252, 1) 100%);
  box-shadow: rgba(63, 94, 251, 0.2) 0px 30px 10px 0px;
  margin-left: 30px;
  margin-top: 20px;
  will-change: transform;
  transition: all 0.3s;
  border-bottom: 2px solid rgba(70, 135, 252, 1);
}
.input-text button:hover {
  transform: perspective(180px) rotateX(30deg) translateY(2px);
}
.input-text button:active {
  transform: perspective(170px) rotateX(36deg) translateY(5px);
}
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 550px;
  height: 400px;
  transform: translateX(-50%) translatey(-50%);
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 16px rgb(0 0 0 / 10%);
  z-index: 3;
  //   background-size: 150px;
  //   background-repeat: no-repeat;
  //   background-position: bottom left;
}
.tools {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(113 119 144 / 25%);
}
.circle {
  padding: 0 4px;
}
.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}
.red {
  background-color: var(--el-color-danger);
  width: 15px;
  height: 15px;
}
.yellow {
  background-color: #ffbd44;
  width: 15px;
  height: 15px;
}
.green {
  background-color: #00ca4e;
  width: 15px;
  height: 15px;
}
.card__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lg-mgt button {
  background-color: #3a6df0;
  border: none;
  padding: 8px 20px;
  height: 35px;
  margin-top: 10px;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
</style>
