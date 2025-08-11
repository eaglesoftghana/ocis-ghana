// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/app.css"],
	app: {
    baseURL: '/ocis-ghana',
		head: {
			title: "ocis ghana".toUpperCase(),
			htmlAttrs: {
				lang: "en-GH",
				class: "dark",
			},
			// link: [
			// 	{
			// 		rel: "icon",
			// 		href: "/favicon.ico",
			// 		sizes: "any",
			// 	},
			// 	{
			// 		rel: "apple-touch-icon",
			// 		href: "/apple-touch-icon.png",
			// 	},
			// 	{
			// 		rel: "manifest",
			// 		href: "/manifest.json",
			// 	},
			// ],
		},
	},
})
