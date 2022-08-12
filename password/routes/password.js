module.exports = {
  routes: [
    {
      method: "POST",
      path: "/password",
      handler: "password.resetPassword",
      config: {
        auth: false
      } // make congif.auth true before deployment
    }
  ]
}