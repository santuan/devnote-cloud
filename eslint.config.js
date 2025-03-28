import pluginVue from "eslint-plugin-vue"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

export default [
  ...pluginVue.configs["flat/strongly-recommended"],
  ...pluginVue.configs["@typescript-eslint/recommended"],
  {
    languageOptions: {
      ecmaVersion: "latest",
    },
  },
  {

    rules: {
      "vue/multi-word-component-names": "off",
      "vue/valid-define-props": "off",
      "vue/valid-define-emits": "off",
    },
  },
  skipFormatting,
]
