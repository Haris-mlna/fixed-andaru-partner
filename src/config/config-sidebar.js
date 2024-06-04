import {
	faFileAlt,
	faGears,
	faHome,
	faListCheck,
	faPeopleRoof,
	faShoppingBasket,
	faStore,
	faTruck,
	faUserGroup,
	faPercent,
} from "@fortawesome/free-solid-svg-icons";

export const configsidebar = {
	navigation: [
		{
			name: "Home",
			icons: faHome,
			variant: "normal",
			link: "/home",
		},
		{
			name: "List Pesanan",
			icons: faListCheck,
			variant: "normal",
			link: "/order-list",
		},
		{
			name: "Pengiriman",
			icons: faTruck,
			variant: "normal",
			link: "/delivery",
		},
		{
			name: "Faktur",
			icons: faFileAlt,
			variant: "normal",
			link: "/invoices",
		},
		{
			name: "Katalog Produk",
			icons: faStore,
			variant: "market",
			link: "/market",
		},
	],
	account: [
		{
			name: "Partner",
			icons: faUserGroup,
			variant: "normal",
			link: "/partner",
		},
		{
			name: "Keranjang Anda",
			icons: faShoppingBasket,
			variant: "normal",
			link: "/cart",
		},
		{
			name: "Manage Akun",
			icons: faPeopleRoof,
			variant: "normal",
			link: "/manage",
		},
		{
			name: "Promo",
			icons: faPercent,
			variant: "normal",
			link: "/promo",
		},
	],
	settings: [
		{
			name: "Pengaturan",
			icons: faGears,
			variant: "solid",
			link: "/settings",
		},
	],
};
