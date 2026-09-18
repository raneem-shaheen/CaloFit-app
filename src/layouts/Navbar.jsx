import { useState } from 'react'
import { Button } from 'antd'

const NAV_LINKS = [
	{ label: 'Daily Menu', href: '/menu' },
	{ label: 'Build a Plan', href: '/build-plan' },
	{ label: 'How it Works', href: '/how-it-works' },
	{ label: 'Subscription', href: '/subscription' },
]

export function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const closeMobileMenu = () => setIsMobileMenuOpen(false)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-warm-200 bg-white">
			<div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-6">
				<div className="flex cursor-pointer items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm">
						<svg
							className="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
							<path d="M12 18v-4" />
						</svg>
					</div>
					<div className="flex flex-col">
						<span className="font-extrabold text-xl leading-none tracking-tight text-warm-900">CALOFIT</span>
						<span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-brand-600">HEALTHY KITCHEN</span>
					</div>
				</div>
				<nav className="hidden items-center justify-center gap-8 text-sm font-medium text-warm-700 md:flex" aria-label="Main navigation">
					{NAV_LINKS.map((link) => (
						<a
							className="cursor-pointer transition-colors hover:text-brand-600"
							href={link.href}
							key={link.href}
						>
							{link.label}
						</a>
					))}
				</nav>
				<div className="hidden items-center justify-end gap-6 md:flex">
					<button
						className="cursor-pointer border-none bg-transparent text-sm font-semibold text-warm-900 transition-colors hover:text-brand-600"
						type="button"
					>
						Sign In
					</button>
					<Button
						className="h-11 px-6 font-bold shadow-sm"
						size="large"
						shape="round"
						type="primary"
					>
						Order Now
					</Button>
				</div>
				<button
					aria-expanded={isMobileMenuOpen}
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					className="flex items-center justify-end text-warm-900 md:hidden"
					onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
					type="button"
				>
					<svg
						aria-hidden="true"
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						{isMobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
					</svg>
				</button>
			</div>
			{isMobileMenuOpen && (
				<div className="flex flex-col gap-4 border-b bg-white p-6 shadow-lg md:hidden">
					<nav className="flex flex-col gap-4" aria-label="Mobile navigation">
						{NAV_LINKS.map((link) => (
							<a
								className="py-2 text-base font-medium text-warm-700 transition-colors hover:text-brand-600"
								href={link.href}
								key={link.href}
								onClick={closeMobileMenu}
							>
								{link.label}
							</a>
						))}
					</nav>
					<div className="flex flex-col gap-4 border-t border-warm-200 pt-4">
						<button
							className="w-full cursor-pointer border-none bg-transparent py-3 text-sm font-semibold text-warm-900 transition-colors hover:text-brand-600"
							onClick={closeMobileMenu}
							type="button"
						>
							Sign In
						</button>
						<Button
							block
							className="h-11 font-bold shadow-sm"
							onClick={closeMobileMenu}
							size="large"
							shape="round"
							type="primary"
						>
							Order Now
						</Button>
					</div>
				</div>
			)}
		</header>
	)
}

export default Navbar
