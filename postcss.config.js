module.exports = {
	plugins: [
		require("autoprefixer")({
			"browsers": [
				"> 1%",
				"not ie <= 11",
				"last 2 versions",
				"last 3 iOS versions",
				"Android >= 4.0"
			]
		})
	]
};