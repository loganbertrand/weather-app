/** @type {import('next').NextConfig} */

require("dotenv").config()

const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
				port: "",
				pathname: "/img/wn/**",
			},
		],
	},
}

module.exports = nextConfig
