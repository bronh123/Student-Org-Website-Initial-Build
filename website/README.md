# Website

## Patching Packages
Install [patch-package](https://www.npmjs.com/package/patch-package) via 
```
yarn add patch-package postinstall-postinstall
```

Make changes to file then run
```
yarn patch-package [package-name]
```

This generates a patches folder with changes

We need this to remove the fragments in imageFragments.js from gatsby-source-sanity. See [issue #114](https://github.com/sanity-io/gatsby-source-sanity/issues/114)