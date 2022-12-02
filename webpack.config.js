const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        Controller: path.resolve(__dirname, 'src/Controller'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'src/[name].js'
    }
}