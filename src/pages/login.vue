<template>
  <div class="login-page-wrapper">
    <!-- <img class="fellow-left" src="../assets/img/fellow-left.svg" alt="" /> -->
    <div class="fellow-left"></div>

    <section class="login-page" v-if="!isLoading">
      <div>
        <span class="fellow-main-logo">
          <img class="logo-img" src="../assets/img/logo-login.png" alt />
          <span class="logo">Fellow</span>
        </span>
        <!-- <img
        alt="Fellow"
        class="fellow-main-logo"
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        />-->
        <section class="inner-section">
          <div class="section-wrapper quick-switch">
            <div class="layout-twothirds-center account-form">
              <h1>{{signUp ? 'Sign up for your account' : 'Log in to Fellow'}}</h1>
              <p v-show="invalid">Invalid name or password</p>
              <div class="login-password-container">
                <form id="login-form" @submit.prevent="submit">
                  <div class="login-password-container-email">
                    <div class="email-password">
                      <div class="hide-when-two-factor">
                        <input
                          v-show="signUp"
                          type="text"
                          name="fullname"
                          id="fullname"
                          v-model="user.fullname"
                          class="form-field"
                          autocorrect="off"
                          spellcheck="false"
                          autocapitalize="off"
                          placeholder="Full Name"
                          value
                        />
                        <!-- v-focus="signUp" -->
                        <!-- inputmode="email" -->
                        <!-- autocomplete="username" -->
                        <input
                          type="text"
                          name="user"
                          id="user"
                          v-model="user.username"
                          class="form-field"
                          autocorrect="off"
                          spellcheck="false"
                          autocapitalize="off"
                          autofocus="autofocus"
                          placeholder="Email"
                          value
                          autocomplete="username"
                          inputmode="email"
                          @focus="$event.target.select()"
                        />
                        <!-- v-focus="!signUp" -->
                        <div id="password-entry" class="show-when-password">
                          <input
                            @focus="$event.target.select()"
                            type="password"
                            name="password"
                            id="password"
                            v-model="user.password"
                            class="form-field"
                            placeholder="Password"
                            autocomplete="current-password"
                          />
                        </div>
                      </div>
                      <input
                        id="submit"
                        type="submit"
                        class="button account-button button-green btn btn-success"
                        :value="signUp ? 'Sign up': 'Log in'"
                      />
                      <!-- @click="submit" -->
                    </div>
                  </div>
                </form>
                <div class="login-methods hide-when-two-factor">
                  <div class="login-method-separator">OR</div>
                  <div class="login-oauth-container">
                    <div id="googleButton" class="google-button oauth-button" tabindex="0">
                      <span id="google-icon" class="google-icon icon"></span>
                      <span
                        class="label"
                        data-analytics-button="loginWithGmailButton"
                      >Continue with Google</span>
                    </div>
                    <div id="msftButton" class="msft-button oauth-button" tabindex="0">
                      <!-- <span id="google-icon" class="facebook-icon icon"></span> -->
                      <i class="fab fa-facebook-square facebook-icon"></i>
                      <span
                        class="label"
                        data-analytics-button="loginWithMicrosoftButton"
                      >Continue with Facebook</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden">
                <form id="login-atlassian-google" action="/authenticate_openid" method="post">
                  <input type="hidden" name="subProvider" value="google" />
                  <input type="hidden" name="isSignup" value="false" />
                  <input type="hidden" name="locale" id="login-atlassian-google-locale" value />
                </form>
                <form id="login-atlassian" action="/authenticate_openid" method="post">
                  <input
                    type="hidden"
                    name="openid_identifier"
                    value="https://id.atlassian.com/openid/v2/op"
                  />
                  <input type="hidden" name="provider" value="atlassian" />
                  <input type="hidden" name="restrictEmail" value="true" />
                  <input type="hidden" name="locale" id="login-atlassian-locale" value />
                  <input type="hidden" name="user" id="login-atlassian-user" value />
                  <input type="hidden" name="confirmNew" value="true" />
                </form>
                <form id="login-atlassian-apple" action="/authenticate_openid" method="post">
                  <input type="hidden" name="provider" value="atlassian" />
                  <input type="hidden" name="subProvider" value="apple" />
                  <input type="hidden" name="locale" id="login-atlassian-apple-locale" value />
                </form>
                <form id="login-atlassian-msft" action="/authenticate_openid" method="post">
                  <input type="hidden" name="provider" value="atlassian" />
                  <input type="hidden" name="subProvider" value="microsoft" />
                  <input type="hidden" name="locale" id="login-atlassian-msft-locale" value />
                </form>
                <form id="login-atlassian-slack" action="/authenticate_openid" method="post">
                  <input type="hidden" name="provider" value="atlassian" />
                  <input type="hidden" name="subProvider" value="slack" />
                  <input type="hidden" name="locale" id="login-atlassian-slack-locale" value />
                </form>
              </div>
              <hr class="bottom-form-separator" />
              <ul class="bottom-form-link">
                <li>
                  <!-- href="/signup" -->
                  <a
                    @click="toggleSignUp"
                    class="signupLink bottom-form-link"
                    data-analytics-link="signUpLoginLink"
                  >{{signUp ? 'Already have an account? Log In' : 'Sign up for an account'}}</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
    <div v-else class="loader">
      <img :src="require('../assets/img/loader.svg')" alt />
    </div>
    <div class="fellow-right"></div>

    <!-- <img class="fellow-right" src="../assets/img/fellow-right.svg" alt="" /> -->
  </div>
</template>

<script>
import logo from "../cmps/logo.cmp.vue";
import { focus } from "vue-focus";

export default {
  directives: { focus },
  data() {
    return {
      user: {
        fullname: "",
        username: "demo",
        password: "demo"
      },
      signUp: false,
      isLoading: false,
      invalid: false
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      this.invalid = false;
      try {
        await this.$store.dispatch({
          type: this.signUp ? "signup" : "login",
          username: this.user.username,
          password: this.user.password,
          fullname: this.signUp ? this.user.fullname : ""
        });
        this.user.fullname = "";
        this.user.username = "demo";
        this.user.password = "demo";
        this.$router.push("/home");
      } catch (err) {
        console.log(
          `cant ${this.signUp ? "signup" : "login "} user:  ${
            this.user.username
          }`,
          err
        );
        this.invalid = true;
        this.user.password = "";
      } finally {
        this.isLoading = false;
      }
    },
    toggleSignUp() {
      if (this.signUp) {
        this.user.username = "demo";
        this.user.password = "demo";
      } else {
        this.user.username = "";
        this.user.password = "";
        this.user.fullname = "";
      }
      this.signUp = !this.signUp;
    }
  },
  components: {
    logo
  }
};
</script>

<style></style>
