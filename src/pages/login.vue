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
              <h1>{{ signUp ? 'Sign up for your account' : 'Log in to Fellow' }}</h1>
              <p v-show="invalid">Invalid name or password</p>
              <p v-show="error">An error accrued, please try again</p>
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
                        :value="signUp ? 'Sign up' : 'Log in'"
                      />
                      <!-- @click="submit" -->
                    </div>
                  </div>
                </form>
                <div class="login-methods hide-when-two-factor">
                  <div class="login-method-separator">OR</div>
                  <div class="login-oauth-container">
                    <GoogleLogin
                      :params="params"
                      :onSuccess="logInWithGoogle"
                      :onFailure="onFailure"
                      id="googleButton"
                      class="google-button oauth-button"
                      tabindex="0"
                    >
                      <span id="google-icon" class="google-icon icon"></span>
                      <span class="label" data-analytics-button="loginWithGmailButton">Continue with Google</span>
                    </GoogleLogin>
                    <div id="msftButton" class="msft-button oauth-button" tabindex="0">
                      <!-- <span id="google-icon" class="facebook-icon icon"></span> -->
                      <i class="fab fa-facebook-square facebook-icon"></i>
                      <span
                        class="label"
                        data-analytics-button="loginWithMicrosoftButton"
                        @click="logInWithFacebook"
                      >Continue with Facebook</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="bottom-form-separator" />
              <ul class="bottom-form-link">
                <li>
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
      <br />
    </section>
    <div v-else class="loader">
      <img :src="require('../assets/img/loader.svg')" alt />
    </div>
    <div class="fellow-right"></div>
  </div>
</template>

<script>
import logo from '../cmps/logo.cmp.vue';
import { focus } from 'vue-focus';
import GoogleLogin from 'vue-google-login';

export default {
  directives: { focus },
  data() {
    return {
      user: {
        fullname: '',
        username: 'demo',
        password: 'demo',
      },
      signUp: false,
      isLoading: false,
      invalid: false,
      error: false,
      params: {
        client_id:
          "961995621272-60aj5sk5o9vlm2a68pqoqbtd32uo5ka3.apps.googleusercontent.com"
      }
    };
  },
  async created() {
    // window.fbAsyncInit = function() {
    //   window.FB.init({
    //     appId: "668161277923698",
    //     xfbml: true,
    //     version: "v2.7"
    //   });
    //   window.FB.AppEvents.logPageView();
    // };

    // (function(d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {
    //     return;
    //   }
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "//connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, "script", "facebook-jssdk");

  },
  methods: {
    async loginExternal(username, fullname, imgUrl, googleUser, fbUser) {
      try {
        await this.$store.dispatch({
          type: "externalLogin",
          username,
          fullname,
          imgUrl,
          googleUser: googleUser,
          fbUser: fbUser
        });
        this.$router.push("/home");
      } catch (err) {
        console.log(
          "cant login with external " + googleUser ? "googl user" : "fb user",
          err
        );
        this.error = true;
      }
    },
    async submit() {
      this.isLoading = true;
      this.invalid = false;
      this.error = false;
      try {
        await this.$store.dispatch({
          type: this.signUp ? 'signup' : 'login',
          username: this.user.username,
          password: this.user.password,
          fullname: this.signUp ? this.user.fullname : '',
        });
        this.user.fullname = '';
        this.user.username = 'demo';
        this.user.password = 'demo';
        this.$router.push('/home');
      } catch (err) {
        console.log(`cant ${this.signUp ? 'signup' : 'login '} user:  ${this.user.username}`, err);
        this.invalid = true;
        this.user.password = '';
      } finally {
        this.isLoading = false;
      }
    },
    toggleSignUp() {
      if (this.signUp) {
        this.user.username = 'demo';
        this.user.password = 'demo';
      } else {
        this.user.username = '';
        this.user.password = '';
        this.user.fullname = '';
      }
      this.signUp = !this.signUp;
      this.error = false;
    },
    async logInWithGoogle(googleUser) {
      try {
        this.error = false;
        const userFromGoogle = googleUser.getBasicProfile();
        this.loginExternal(
          userFromGoogle.pv,
          userFromGoogle.jf,
          userFromGoogle.oN,
          true,
          false,
        );
      } catch (err) {
        console.log("cant login with google", err);
        this.error = true;
      }
    },
    onFailure(err) {
      console.log("failed", err);
      this.error = true;
    },
    async logInWithFacebook() {
      this.error = false;
      const copyThis = this;
      window.FB.login(
        async function(response) {
          if (response.authResponse) {
            FB.api("/me", { fields: "name, email, picture" }, async function(
              response
            ) {
              console.log(response);
              copyThis.loginExternal(
                response.email,
                response.name,
                response.picture.data.url,
                false,
                true
              );
            });
          } else {
            this.error = true;
            alert("User cancelled login or did not fully authorize.");
          }
        },
        {
          return_scopes: true
        }
      );
    }
  },
  components: {
    logo,
    GoogleLogin
  }
};
</script>

<style></style>
