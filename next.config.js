/** @type {import('next').NextConfig} */

require("dotenv").config()

const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
}

module.exports = nextConfig
