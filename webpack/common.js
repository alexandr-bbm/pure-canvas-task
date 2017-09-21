const PRODUCTION = process.env.NODE_ENV === 'production';

const uglifyJsOptions = {
    beautify: false,
    comments: false,
    compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
    }
};

const devtool = PRODUCTION ? false : 'inline-source-map';

module.exports = { uglifyJsOptions, PRODUCTION, devtool };