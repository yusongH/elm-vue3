module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ['plugin:vue/vue3-recommended', 'eslint:recommended'],

	// add your custom rules here
	rules: {
		// "prettier/prettier": "error",
		// allow async-await
		'generator-star-spacing': 'off',
		// 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// allow debugger during development
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// 强制使用单引号
		quotes: ['error', 'single'],
		// 强制不使用分号结尾
		semi: ['error', 'never']
	},
}
