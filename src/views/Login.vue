<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
  </div>
</template>
<script>
import { readSync } from "fs";
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名:",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              //校验规则
              required: true,
              type: "string",
              min: "3",
              max: "15"
            },
            trigger: blur,
            messages: {
              required: "用户名不能为空",
              min: "用户名不能少于3个字符",
              max: "用户名不能大于15个字符"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码:",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              //校验规则
              required: true,
              min: "6",
              max: "25"
            },
            trigger: blur,
            messages: {
              required: "密码不能为空",
              min: "密码不能少于6个字符",
              max: "密码最大长度为25个字符"
            }
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
      try {
        const result = await this.$http.get("/api/login", {
          params: this.model
        });
        if ((result.code = "0")) {
          this.$store.commit("settoken", result.token);
          window.localStorage.setItem("token", result.token);
        } else {
          alert(result.message);
        }
      } catch (e) {}
    }
  }
};
</script>
<style scoped>
.cube-form {
  /* font-size: 12px;
  width: 400px; */
}
</style>


