module.exports = {
    "env": {
        "es6": true,
		"node": true,
		"mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
	},
	"plugins": [
		"mocha"
	  ],
    "rules": {
		"mocha/no-exclusive-tests": "error",
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};