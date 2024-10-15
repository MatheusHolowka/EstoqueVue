<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Cadastro</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Nome"
                v-model="name"
                :rules="[(v) => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>

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
            <v-btn :disabled="!valid" color="primary" @click="register">
              Registrar
            </v-btn>
            <v-btn text @click="goToLogin">Já tem uma conta? Login</v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-if="errorMessage" type="error" class="mt-3">
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="successMessage" type="success" class="mt-3">
          {{ successMessage }}
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
      name: "",
      email: "",
      password: "",
      valid: false,
      errorMessage: "",
      successMessage: "",
      emailRules: [
        (v) => !!v || "Email é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      passwordRules: [(v) => !!v || "Senha é obrigatória"],
    };
  },
  methods: {
    register() {
      const userData = {
        nome: this.name.trim(), // Garanta que não tenha espaços desnecessários
        email: this.email.trim(),
        senha: this.password.trim(),
      };

      if (!userData.nome || !userData.email || !userData.senha) {
        this.errorMessage = "Todos os campos são obrigatórios.";
        return;
      }

      axios
        .post("http://localhost:3000/auth/register", userData)
        .then(() => {
          this.successMessage = "Cadastro realizado com sucesso!";
          this.errorMessage = "";
          this.name = "";
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          console.error(
            "Erro ao registrar usuário:",
            error.response?.data || error.message
          );
          this.errorMessage =
            error.response?.data?.message ||
            "Erro ao registrar. Tente novamente.";
          this.successMessage = "";
        });
    },

    goToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
