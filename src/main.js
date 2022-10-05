import Vue from "vue";
import Keycloak from "keycloak-js";
import App from "./App.vue";

let initOptions = {
  url: "http://127.0.0.1:8080/",
  realm: "myrealm",
  clientId: "myclient",
  onLoad: "login-required",
  checkLoginIframe: false,
};

let keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated")

      new Vue({
        el: "#app",
        render: (h) => h(App, { props: { keycloak: keycloak } }),
      });
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.info("Token refreshed" + refreshed);
          } else {
            console.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 6000);
  })
  .catch((e) => {
    // Vue.$log.error("Authenticated Failed", e.toString());
    console.log("Authenticated Failed", e.toString());
  });
