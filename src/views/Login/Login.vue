<template lang="pug">
.login-container
  canvas(ref="nest")
  .login-content
    .card-box
      header.login-header
        h1.logo.hide-text 知乎
        h2.subtitle 与世界分享你的知识、经验与见解
      el-form.login-form(ref="loginForm", :model="loginForm", :rules="loginRules", autoComplete="on")
        el-form-item(prop="username")
          el-input(
            name="username",
            type="text",
            v-model="loginForm.username",
            autoComplete="on",
            placeholder="手机号或邮箱"
          )
        el-form-item(prop="password")
          el-input(
            name="password",
            :type="pwdType",
            v-model="loginForm.password",
            autoComplete="on",
            placeholder="密码",
            @keyup.enter.native="handleLogin"
          )
          span.show-pwd(@click="handleShowPwd")
            i.fa.fa-eye(aria-hidden="true")
      el-button.login-btn(type="primary", :loading="loading", @click.prevent="handleLogin") 登录
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Form } from 'element-ui';
import requestAnimationFrame from 'raf';
import CanvasNest from '@/utils/canvas-nest';
import { LOGIN_BY_USER_NAME } from '@/constants';
import { User } from '@/types/interface/user';

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 4) {
    callback(new Error('密码不能小于4位'));
  } else {
    callback();
  }
};

@Component
export default class Login extends Vue {
  loginForm: User = {
    username: '',
    password: '',
  };

  loginRules: any = {
    username: [
      { required: true, message: '请填写手机或邮箱', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' },
    ],
  };

  loading: boolean = false;
  showPwd: boolean = false;

  @Action(LOGIN_BY_USER_NAME) LOGIN_BY_USER_NAME: any;

  get pwdType() {
    return this.showPwd ? '' : 'password';
  }

  mounted() {
    this.initCanvas();
  }

  async initCanvas() {
    const canvas = this.$refs.nest as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const w = canvas.width;
    const h = canvas.height;

    const cvsNest = new CanvasNest(w, h, ctx);

    const draw = () => {
      cvsNest.draw();
      requestAnimationFrame.call(window, draw);
    };

    await cvsNest.init(100);
    draw();
    this.bindEvent(cvsNest);
  }

  bindEvent(cvsNest: CanvasNest) {
    window.onmousemove = (e) => {
      e = e || window.event;
      cvsNest.star.x = e.clientX;
      cvsNest.star.y = e.clientY;
    };

    window.onmouseout = () => {
      cvsNest.star.x = 0;
      cvsNest.star.y = 0;
    };
  }

  handleLogin() {
    const loginForm = this.$refs.loginForm as Form;
    loginForm.validate(async (valid) => {
      if (valid) {
        try {
          this.loading = true;
          await this.LOGIN_BY_USER_NAME(this.loginForm);
          this.$router.push({ path: '/' });
        } catch (error) {
        } finally {
          this.loading = false;
        }
      }
    });
  }

  handleShowPwd() {
    this.showPwd = !this.showPwd;
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';

.login-container,
.login-content,
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.login-container {
  position: relative;
}

.login-content {
  position: absolute;
  top: 0;
  left: 0;

  .card-box {
    width: 300px;
    padding: 30px 0 102px;
    margin: 120px auto;

    .login-header {
      text-align: center;

      .logo {
        margin: 0 auto;
        width: 160px;
        height: 74px;
        background: url('~@/assets/logo.png') no-repeat;
        background-size: contain;
      }

      .subtitle {
        margin: 30px 0 20px;
        font-weight: 400;
        font-size: 18px;
        line-height: 1;
      }
    }

    .login-form {
      border: 1px solid $border-color;
      border-radius: 3px;

      .el-form-item {
        margin-bottom: 0;

        &:not(:last-child) {
          border-bottom: 1px solid $border-color;
        }

        input {
          -webkit-appearance: none;
          border: 0;
          padding: 12px 5px 12px 15px;
          color: $text-color;
          height: 47px;
        }

        .show-pwd {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }

        .el-form-item__error {
          right: 0;
          left: unset;
          top: 0;
          bottom: 0;
          padding: 0 8px;
          line-height: 48px;
          font-size: 14px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff 8px);
          transition: .25s ease-out;
        }
      }
    }

    .login-btn {
      width: 100%;
      margin-top: 20px;
      background-color: $btn-color;
      border-color: $btn-color;
      font-size: 16px;
      border-radius: 3px;
      padding: 11px 15px;

      &:hover {
        background: $btn-hover-color;
        border-color: $btn-hover-color;
      }
    }
  }

  @media (min-width: 741px) {
    .card-box {
      padding: 0;
      min-height: 590px;
      vertical-align: middle;
      text-align: left;
      white-space: normal;
    }
  }
}
</style>
