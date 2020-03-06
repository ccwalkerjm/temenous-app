/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

<template>
  <div>
    <div
      v-bind:class="onsenClasses.formSection"
      v-bind:data-test="auth.setMFAComp.section"
      v-if="displayTotpSetup"
    >
      <div
        v-bind:class="onsenClasses.sectionHeader"
        v-bind:data-test="auth.setMFAComp.headerSection"
      >
        {{$Amplify.I18n.get('Verify Authentication Token')}}
        <div
          style="font-size: 16px; color: #828282; margin-top: 10px;"
        >{{options.tokenInstructions}}</div>
      </div>

      <div v-bind:class="onsenClasses.sectionBody">
        <div v-bind:class="onsenClasses.formField">
          <div v-bind:class="onsenClasses.fieldFormat">
            <qrcode-vue v-bind:class="onsenClasses.totpQrcode" :value="token" :size="300" level="H"></qrcode-vue>
          </div>
        </div>

        <div v-bind:class="onsenClasses.formField">
          <div v-bind:class="onsenClasses.fieldFormat">
            <div v-bind:class="onsenClasses.inputLabel">{{$Amplify.I18n.get('Verification Code')}} *</div>
            <input
              v-bind:class="onsenClasses.input"
              v-model="code"
              :placeholder="$Amplify.I18n.get('Verification Code')"
              autofocus
              v-bind:data-test="auth.setMFAComp.verificationCodeInput"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="onsenClasses.formSection" v-bind:data-test="auth.setMFAComp.section" v-else>
      <div v-bind:class="onsenClasses.sectionHeader">
        {{options.header}}
        <div style="font-size: 16px; color: #828282; margin-top: 10px;">{{options.mfaDescription}}</div>
      </div>

      <div v-bind:class="onsenClasses.sectionBody" v-bind:data-test="auth.setMFAComp.bodySection">
        <div v-bind:class="onsenClasses.formField" v-if="options.mfaTypes.includes('SMS')">
          <div v-bind:class="onsenClasses.fieldFormat">
            <div v-bind:class="onsenClasses.inputLabel">
              <input
                v-bind:class="onsenClasses.radio"
                type="radio"
                name="mfaPreference"
                value="SMS"
                v-model="mfaPreference"
                v-bind:data-test="auth.setMFAComp.smsInput"
              />
              {{options.smsDescription}}
            </div>
          </div>
        </div>
        <div v-bind:class="onsenClasses.formField" v-if="options.mfaTypes.includes('TOTP')">
          <div v-bind:class="onsenClasses.fieldFormat">
            <div v-bind:class="onsenClasses.inputLabel">
              <input
                v-bind:class="onsenClasses.radio"
                type="radio"
                name="mfaPreference"
                value="TOTP"
                v-model="mfaPreference"
                v-bind:data-test="auth.setMFAComp.totpInput"
              />
              {{options.totpDescription}}
            </div>
          </div>
        </div>
        <div v-bind:class="onsenClasses.formField" v-if="options.mfaTypes.includes('None')">
          <div v-bind:class="onsenClasses.fieldFormat">
            <div v-bind:class="onsenClasses.inputLabel">
              <input
                v-bind:class="onsenClasses.radio"
                type="radio"
                name="mfaPreference"
                value="NOMFA"
                v-model="mfaPreference"
                v-bind:data-test="auth.setMFAComp.noMfaInput"
              />
              {{options.noMfaDescription}}
            </div>
          </div>
        </div>
      </div>

      <div v-bind:class="onsenClasses.sectionFooter">
        <span v-bind:class="onsenClasses.sectionFooterPrimaryContent">
          <button
            id="verify"
            v-bind:class="onsenClasses.button"
            v-on:click="verifyTotpToken"
            v-if="displayTotpSetup"
            v-bind:data-test="auth.setMFAComp.verifyTotpTokenButton"
          >{{$Amplify.I18n.get('Verify Token')}}</button>

          <button
            id="setMfa"
            v-bind:class="onsenClasses.button"
            v-on:click="setMFA"
            v-else
            v-bind:data-test="auth.setMFAComp.setMfaButton"
          >{{$Amplify.I18n.get('Set MFA')}}</button>
        </span>
        <span v-bind:class="onsenClasses.sectionFooterSecondaryContent">
          <a
            v-bind:class="onsenClasses.a"
            v-on:click="cancel"
            v-bind:data-test="auth.setMFAComp.cancelButton"
          >{{$Amplify.I18n.get('Cancel')}}</a>
        </span>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
// import Auth from '@aws-amplify/auth';
import AmplifyEventBus from "../../events/AmplifyEventBus";
import OnsenClasses from "../../assets/onsenui-mapping";
import QrcodeVue from "qrcode.vue";
import { auth } from "../../assets/data-test-attributes";

export default {
  name: "SetMfa",
  props: ["mfaConfig"],
  data() {
    return {
      user: null,
      mfaPreference: null,
      code: null,
      token: "",
      error: "",
      displayTotpSetup: false,
      onsenClasses: OnsenClasses,
      auth,
      logger: {}
    };
  },
  components: {
    QrcodeVue
  },
  mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name);
    this.setUser();
  },
  computed: {
    options() {
      const defaults = {
        header: "Multifactor Authentication Preference",
        mfaDescription:
          "AWS Multi-Factor Authentication (MFA) adds an extra layer of protection on top of your user name and password.",
        tokenInstructions:
          "Scan the QR Code with your phone camera or authentication app to get the MFA code.",
        smsDescription:
          "SMS text messaging (receive a code on your mobile device)",
        totpDescription:
          "One-time password (use a QR code and MFA app to save a token on your mobile device)",
        noMfaDescription: "Do not enable MFA",
        mfaTypes: []
      };
      return Object.assign(defaults, this.mfaConfig || {});
    }
  },
  watch: {
    mfaPreference(value) {
      if (value === "TOTP") {
        this.setup();
      }
    }
  },
  methods: {
    setup() {
      AmplifyEventBus.$emit("authState", null, true);
      this.$Amplify.Auth.setupTOTP(this.user)
        .then(data => {
          AmplifyEventBus.$emit("authState", null, false);
          this.logger.info("setTOTP success");
          this.token =
            "otpauth://totp/AWSCognito:" +
            this.user.username +
            "?secret=" +
            data +
            "&issuer=AWSCognito";
        })
        .catch(e => this.setError(e));
    },
    setUser: async function() {
      AmplifyEventBus.$emit("authState", null, true);
      await this.$Amplify.Auth.currentAuthenticatedUser()
        .then(user => {
          AmplifyEventBus.$emit("authState", null, false);
          this.logger.info("currentAuthenticatedUser success");
          if (user) {
            this.user = user;
          } else {
            this.user = null;
          }
          return this.user;
        })
        .catch(e => {
          this.user = null;
          this.setError(e);
          return this.user;
        });
    },
    setMFA: function() {
      AmplifyEventBus.$emit("authState", null, true);
      this.$Amplify.Auth.setPreferredMFA(this.user, this.mfaPreference)
        .then(() => {
          AmplifyEventBus.$emit("authState", "signedIn");
          this.$destroy();
        })
        .catch(e => {
          AmplifyEventBus.$emit("authState", null, false);
          if (e.message === "User has not verified software token mfa") {
            return (this.displayTotpSetup = true);
          }
          this.setError(e);
        });
    },
    verifyTotpToken() {
      AmplifyEventBus.$emit("authState", null, true);
      this.$Amplify.Auth.verifyTotpToken(this.user, this.code)
        .then(() => {
          AmplifyEventBus.$emit("authState", null, false);
          this.logger.info("verifyTotpToken success");
          this.setMFA();
        })
        .catch(e => this.setError(e));
    },
    setError: function(e) {
      AmplifyEventBus.$emit("authState", null, false);
      this.error = this.$Amplify.I18n.get(e.message || e);
      this.logger.error(this.error);
    },
    cancel: function() {
      AmplifyEventBus.$emit("authState", "cancel");
      //return this.options.cancelHandler ? this.options.cancelHandler() : null;
    }
  }
};
</script>
