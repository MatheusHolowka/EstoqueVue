<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Senha"
                v-model="password"
                :rules="passwordRules"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn :disabled="!valid" color="primary" @click="login">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-if="errorMessage" type="error">
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      errorMessage: "",
      emailRules: [
        (v) => !!v || "Email é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [(v) => !!v || "Senha é obrigatória"],
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email.trim(),
        senha: this.password.trim(), // Certifique-se de que é 'senha'
      };

      console.log("Dados enviados:", userData); // Log para verificar

      axios
        .post("http://localhost:3000/auth/login", userData)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error(
            "Erro ao fazer login:",
            error.response?.data || error.message
          );
          this.errorMessage =
            error.response?.data.message ||
            "Erro ao fazer login. Tente novamente.";
        });
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
