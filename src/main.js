// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import "vuetify/dist/vuetify.min.css";
import "font-awesome/css/font-awesome.css";

import Vuetify from "vuetify";

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./styles/global.css";
import stores from "./stores";

import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import fullCalendar from "vue-fullcalendar";
import { setupComponents } from "./config/setup-components";

import { setupAndGetI18n } from "./config/setup-i18n";

const i18n = setupAndGetI18n(Vue);

import swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";

Vue.use(VueChartkick, { adapter: Chart });
Vue.component("full-calendar", fullCalendar);
Vue.component("swatches", swatches);

setupComponents(Vue);

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    stores,
    i18n,
    components: { App },
    template: "<App/>",
    data: {
        themeColor: "#1D2939",
    },

    methods: {
        setLanguage(language) {
            const vm = this;

            localStorage.setItem("language", language);

            document.documentElement.lang = language;
            vm.$i18n.locale = language;

            vm.$vuetify.lang.current = language;
        }
    },

    created() {
        const vm = this;

        vm.setLanguage("en");
    }
});