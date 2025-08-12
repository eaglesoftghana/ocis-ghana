// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	ssr: true,
	css: ["~/assets/app.css"],
	app: {
		baseURL: "/ocis-ghana",
		head: {
			title: "ocisghana".toUpperCase(),
			htmlAttrs: {
				lang: "en-GH",
				class: "dark",
			},
			meta: [
				{
					name: "description",
					content:
						"Streamline your church's operations in Ghana with Online Church Information Management System (OCISGHANA). Manage members, finances, events, and communication effortlessly.",
				},
				{
					name: "keywords",
					content:
						"church management system, church software, church administration software, church management platform, SaaS for churches, church management system in Ghana, Ghanaian church software, best church management software Ghana, online church management Ghana, church membership software Accra, church accounting software Ghana, church member database, online giving platform for churches, church financial management software, church event management, church communication tool, church asset management system, church branch management software, church directory software, church SMS service Ghana, mobile money giving for churches, how to manage church members, software to organize church data, tools for church administrators, streamline church operations, solutions for church growth, church record keeping",
				},
				{
					name: "author",
					content: "Kingsley Osei Opoku - Quajo King",
				},
			],
			link: [
				{
					rel: "author",
					href: "https://quajo-king.github.io",
				},
			],
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
});
