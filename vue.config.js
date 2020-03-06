module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: "Temenos App",
      themeColor: "#FF0000",
      msTileColor: "#FFFFFF",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "white",
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        //swSrc: 'src/service-worker.js'
      },
      manifestOptions: {
        background_color: "#FFFFFF",       
      }
    }
  };
  