/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path")
const tsconfig = require("./tsconfig.json")

const trimString = (str) => str.substring(0, str.length - 2)

// Takes in paths defined in tsconfig.json, strips them of * and then adds them as webpack aliases
exports.onCreateWebpackConfig = ({ actions }) => {
    const aliases = tsconfig["compilerOptions"]["paths"]
    const webpackAliases = {}
    for (let key in aliases) {
        const value = trimString(aliases[key][0])
        webpackAliases[trimString(key)] = path.isAbsolute(value) ? value : path.resolve(value)
    }
    actions.setWebpackConfig({
        resolve: {
            alias: webpackAliases
        }
    })
}

