module.exports = {
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'entry',
            corejs: 'core-js@3',
            targets: {
                node: 'current',
            },
        }],
        ['@babel/preset-react', { flow: false, typescript: true }],
        ['@babel/typescript', { isTSX: true, allExtensions: true }],
    ],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        ['module-resolver', {
            root: ['./'],
            alias: {
                '@components': './src/components'
            },
        }],
    ],
};
