module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),

  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "2b30a818becc6a0ac34122dafbc750d5"),
    },
  },
});
