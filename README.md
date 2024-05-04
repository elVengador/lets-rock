# Set-up Linter + Prettier + VsCode config fro nextJs Project

- first add rules on `.eslintrc.json`
- then install your plugins and set up on `.eslintrc.json`

```json
{
  "eslint-config-next": "14.1.4", // rules from nextJs
  "eslint-config-prettier": "^9.1.0", // override eslint rules with prettier
  "eslint-plugin-react": "^7.34.1", // rules from react
  "eslint-plugin-react-hooks": "^4.6.0", // rules from hooks
  "eslint-plugin-simple-import-sort": "^12.0.0" // rules to sort imports
}
```

- then install your prettier and set up rules on `.prettier.json`
- finally set up the `.vscode/settings.json` to:
  - use the prettier formatter in this project
  - display rulers
