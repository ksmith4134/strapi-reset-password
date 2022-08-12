"use strict";
const bcrypt = require("bcryptjs");

const utils = require("@strapi/utils");
const { santize } = utils;

module.exports = {
  resetPassword: async ctx => {
    const {
      identifier, 
      currentPassword, 
      newPassword, 
      confirmNewPassword
    } = ctx.request.body;

    if (!identifier || !currentPassword || !newPassword || !confirmNewPassword) {
      return ctx.throw(400, "Please fill out all fields.");
    }

    if (newPassword && confirmNewPassword && (newPassword !== confirmNewPassword)) {
      return ctx.throw(401, "Your new password and password confirmation do not match. Please try again.");
    }

    let user = await strapi
      .query("plugin::users-permissions.user")
      .findOne({where: { username: identifier }});

    const validPassword = await strapi
      .service("plugin::users-permissions.user")
      .validatePassword(currentPassword, user.password);

    // validate "blocked" user field
    // !blocked && continue...

    if (!validPassword) {
      return ctx.throw(401, "Your current password is incorect");
    } else {
      // Generate new hashed password
      const password = bcrypt.hashSync(newPassword, 10);

      user = await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { resetPasswordToken: null, password },
      });

      // Return new jwt token
      ctx.send({
        jwt: strapi.service("plugin::users-permissions.jwt").issue({
          id: user.id,
        }),
        // Remove sensitive info from user data
        // https://forum.strapi.io/t/v4-0-0-sanitize-user-data/13326/8
        // See post by "antokhio"
        user: await utils.sanitize.contentAPI.output(
          user,
          strapi.getModel("plugin::users-permissions.user")
        )
      });

    }       
  }
}