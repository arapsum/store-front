import { Link } from "@tanstack/react-router";
import {
	MenuIcon,
	XIcon,
	SearchIcon,
	HeartIcon,
	ShoppingCartIcon,
	UserIcon,
	type LucideIcon,
} from "lucide-react";
import Logo from "./Logo";
import { Separator } from "./ui/separator.tsx";
import { useState } from "react";
import useCartStore from "#/store/store.ts";

export const navItems = [
	{ name: "Home", link: "/", isActive: true },
	{ name: "About", link: "/#about", isActive: false },
	{ name: "Contact Us", link: "/#contact-us", isActive: false },
	{ name: "Blog", link: "/#blog", isActive: false },
];

export const iconButtons = [
	{ icon: HeartIcon, link: "#/wishlist" },
	{ icon: ShoppingCartIcon, link: "/cart" },
	{ icon: UserIcon, link: "#/account" },
];

export const SearchBar = () => (
	<div className="relative w-full group">
		<SearchIcon className="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2 pointer-events-none group-hover:text-gray-600 size-6" />
		<input
			type="search"
			className="inset-0.5 py-4 pr-4 pl-4 lg:pl-12 w-full rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-[#656565] placeholder:text-sm placeholder:leading-[4.5] bg-[#F5F5F5] backdrop-blur-md"
			placeholder="Search..."
		/>
	</div>
);

export const NavItem = ({
	name,
	link,
	isActive,
}: {
	name: string;
	link: string;
	isActive: boolean;
}) => {
	return (
		<a
			href={link}
			className={`text-sm lg:text-base font-medium ${isActive ? "text-black hover:text-black/75" : "text-black/30 hover:text-black/50"}`}
		>
			{name}
		</a>
	);
};

export const IconButton = ({
	icon: Icon,
	link,
}: {
	icon: LucideIcon;
	link: string;
}) => (
	<a href={link}>
		<button
			type="button"
			className="transition cursor-pointer hover:text-black/50"
		>
			<Icon className="text-black size-6" />
		</button>
	</a>
);

function MobileHeader({
	open,
	setOpen,
	cartItems,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	pathname: string;
	cartItems: number;
}) {
	return (
		<>
			<header className="flex sticky top-0 justify-between items-center py-6 px-2 w-full bg-white">
				<Link to="/">
					<Logo colour="black" />
				</Link>

				<button
					type="button"
					onClick={() => setOpen(true)}
					className="transition cursor-pointer"
				>
					<MenuIcon className="size-10 text-[#080341]" />
				</button>
			</header>

			{/* Menu Modal Overlaya  */}
			<div
				onClick={() => setOpen(false)}
				className={`fixed inset-0 bg-white/40 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			/>
			<div
				className={`fixed top-0 right-0 h-full sm:w-120 bg-white z-50 shadow-2xl transition-transform transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex justify-between items-center p-6 border-b">
					<Logo />

					<button
						type="button"
						onClick={() => setOpen(false)}
						className="transition cursor-pointer"
					>
						<XIcon className="size-10 text-[#080341]" />
					</button>
				</div>

				<div className="flex flex-col p-6 space-y-6">
					<SearchBar />

					<nav className="flex flex-col space-y-6">
						{navItems.map((item) => (
							<NavItem key={item.link} {...item} />
						))}
					</nav>

					<Separator />

					<div className="flex justify-around items-center">
						<IconButton icon={HeartIcon} link="#/wishlist" />
						<IconButton icon={UserIcon} link="#/account" />

						<a href="/cart" className="relative">
							<ShoppingCartIcon className="text-black size-6" />
							<span className="flex absolute -top-3 -right-3 justify-center items-center text-xs font-medium text-gray-600 bg-amber-400 rounded-full size-4">
								{cartItems}
							</span>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default function Header() {
	const [open, setOpen] = useState(false);
	const { cart } = useCartStore();

	const items = cart.reduce((acc, item) => acc + item.quantity, 0);

	const pathname = "/";
	return (
		<>
			<section className="md:hidden">
				<MobileHeader
					open={open}
					setOpen={setOpen}
					pathname={pathname}
					cartItems={items}
				/>
			</section>

			<header className="hidden sticky top-0 z-50 py-4 px-4 w-full border-b md:block border-black/40 backdrop-blur-lg">
				<div className="flex gap-3 justify-between items-center md:gap-4 lg:gap-6 xl:gap-8">
					{/* Logo Section */}
					<Link to="/" className="w-20 h-8 md:w-24 shrink-0">
						<Logo colour="black" />
					</Link>
					{/* Search field */}
					<div className="w-60 md:w-56 lg:w-108">
						<SearchBar />
					</div>
					{/* Navbar */}
					<nav className="flex gap-4 items-center md:gap-6 lg:gap-8 xl:gap-12">
						{navItems.map((item) => (
							<NavItem key={item.link} {...item} />
						))}
					</nav>
					{/* Icon Buttons */}
					<div className="flex gap-3 items-center md:gap-4 lg:gap-6 shrink-0">
						<IconButton icon={HeartIcon} link="#/wishlist" />
						<IconButton icon={UserIcon} link="#/account" />

						<a href="/cart" className="relative">
							<ShoppingCartIcon className="text-black size-6" />
							<span className="flex absolute -top-3 -right-3 justify-center items-center text-xs font-medium text-gray-600 bg-amber-400 rounded-full size-4">
								{items}
							</span>
						</a>
					</div>
				</div>
			</header>
		</>
	);
}
