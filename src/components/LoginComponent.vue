<template>
  <div>
    <LoginHeaderComponent>
    </LoginHeaderComponent>
    <LoginFormComponent title="Login">
    </LoginFormComponent>
  </div>
</template>

<script>
import LoginHeaderComponent from "./LoginHeaderComponent"
import LoginFormComponent from "./LoginFormComponent";
export default {
  components: {
    LoginHeaderComponent: LoginHeaderComponent,
    LoginFormComponent: LoginFormComponent,
  },
name: "LoginComponent",
}
</script>

<style scoped>

</style>