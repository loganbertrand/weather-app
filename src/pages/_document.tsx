import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				></link>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@600;700&family=Epilogue:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&family=Sora:wght@400;500;600&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
