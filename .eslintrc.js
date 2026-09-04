module.exports = {
  root: true,
  extends: ["@projektor/eslint-config-custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
