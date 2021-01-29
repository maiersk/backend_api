module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "standard"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        
    ],
    "rules": {
        "indent": ["warn", 2],
        "eqeqeq": "warn",
        'prefer-const': 'off'
    }
};
