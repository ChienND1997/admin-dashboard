<template>
  <v-app id="login" class="blue lighten-3">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class=" pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="static/logo.png"
                    alt="Vue Material Admin"
                    width="180"
                    height="180"
                  />
                  <h1 class="flex my-4 primary--text">Login Page</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="username"
                    :error="error"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="
                      hidePassword ? 'visibility_off' : 'visibility'
                    "
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { AuthService } from "../../sevices/auth.service";
export default {
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  methods: {
    async login() {
      const vm = this;

      if (!vm.username || !vm.password) {
        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }
      try {
        const res = await AuthService.makeLogin({
          username: this.username,
          password: this.password,
        });
        this.error = "";
        vm.$router.push({ name: "Dashboard" });
        console.log("res", res);
        localStorage.setItem("jwt", res.body.jwttoken);
      } catch (error) {
        vm.error = true;
        vm.result = "Email or Password is incorrect.";
        vm.showResult = true;
      }
    },
  },
};
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
