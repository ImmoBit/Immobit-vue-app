const dotenv = require('dotenv')
dotenv.config()
let bucket = process.env.VUE_APP_BUCKET;
let publicPath = "/";

module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "default",
      region: "eu-west-1",
      bucket: "immobit-app",
      createBucket: false,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read",
      pwa: true,
      pwaFiles: "index.html,service-worker.js,manifest.json",
      cacheControl: "max-age=0",
      enableCloudfront: true,
      uploadConcurrency: 5,
      pluginVersion: "4.0.0-rc3",
      cloudfrontId: "E1HBEE1B42ABRN",
      cloudfrontMatchers: "/index.html,/service-worker.js,/manifest.json",
      gzip: true,
      gzipFilePattern:
        "**/*.{js,css,json,ico,map,xml,txt,svg,eot,ttf,woff,woff2}",
      overrideEndpoint: false
    }
  }
};
