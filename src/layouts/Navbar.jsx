import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { useAuth } from '../stores/AuthContext'

const NAV_LINKS = [
	{ label: 'Daily Menu', href: '/menu' },
	{ label: 'Build a Plan', href: '/build-plan' },
	{ label: 'How it Works', href: '/how-it-works' },
	{ label: 'Subscription', href: '/subscription' },
]

export function Navbar({ onOpenAuth }) {
	const { user, isAuthenticated, logout } = useAuth()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const userDropdownRef = useRef(null)
	const closeMobileMenu = () => setIsMobileMenuOpen(false)
	const handleLogout = async () => {
		if (isLoggingOut) return
		try {
			setIsLoggingOut(true)
			await logout()
			if (typeof setIsUserDropdownOpen === 'function') {
				setIsUserDropdownOpen(false)
			}
			closeMobileMenu()
		} catch (err) {
			console.error('Logout failed:', err)
		} finally {
			setIsLoggingOut(false)
		}
	}

	useEffect(() => {
		if (!isUserDropdownOpen) return

		const handleOutsideClick = (event) => {
			if (!userDropdownRef.current?.contains(event.target)) {
				setIsUserDropdownOpen(false)
			}
		}

		document.addEventListener('pointerdown', handleOutsideClick)
		return () => document.removeEventListener('pointerdown', handleOutsideClick)
	}, [isUserDropdownOpen])

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
					{isAuthenticated ? (
						<div className="relative" ref={userDropdownRef}>
							<button
								aria-expanded={isUserDropdownOpen}
								aria-label="Open user menu"
								className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-warm-200 bg-brand-100 font-bold text-brand-700 transition-colors hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
								onClick={() => setIsUserDropdownOpen((isOpen) => !isOpen)}
								type="button"
							>
								{user?.avatar ? (
									<img alt="" className="h-full w-full object-cover" src={user.avatar} />
								) : (
									user?.name?.trim()?.charAt(0).toUpperCase() || '?'
								)}
							</button>
							{isUserDropdownOpen && (
								<div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-warm-100 bg-white py-2 shadow-xl animate-in fade-in zoom-in-95">
									<div className="px-4 py-2">
										<p className="truncate text-sm font-bold text-warm-900">{user?.name}</p>
										<p className="truncate text-xs text-warm-700">{user?.email}</p>
									</div>
									<div className="my-1 border-t border-warm-100" />
									<button
										className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
										disabled={isLoggingOut}
										onClick={handleLogout}
										type="button"
									>
										{isLoggingOut ? (
											<svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
												<path className="opacity-75" d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
											</svg>
										) : (
											<svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0 4-4m-4 4 4 4m5-9V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-1" />
											</svg>
										)}
										{isLoggingOut ? 'Signing Out...' : 'Sign Out'}
									</button>
								</div>
							)}
						</div>
					) : (
						<button
							className="cursor-pointer border-none bg-transparent py-3 text-sm font-semibold text-warm-900 transition-colors hover:text-brand-600"
							onClick={() => onOpenAuth?.()}
							type="button"
						>
							Sign In
						</button>
					)}
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
						{isAuthenticated ? (
							<div className="flex items-center justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									{user?.avatar ? (
										<img alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" src={user.avatar} />
									) : (
										<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
											{user?.name?.trim()?.charAt(0).toUpperCase() || '?'}
										</div>
									)}
									<div className="min-w-0">
										<p className="truncate text-sm font-semibold text-warm-900">{user?.name}</p>
										<p className="truncate text-xs text-warm-700">{user?.email}</p>
									</div>
								</div>
								<button
									className="flex shrink-0 cursor-pointer items-center gap-2 border-none bg-transparent py-3 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
									disabled={isLoggingOut}
									onClick={handleLogout}
									type="button"
								>
									{isLoggingOut && (
										<svg aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
											<path className="opacity-75" d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
										</svg>
									)}
									{isLoggingOut ? 'Signing Out...' : 'Sign Out'}
								</button>
							</div>
						) : (
							<button
								className="w-full cursor-pointer border-none bg-transparent py-3 text-sm font-semibold text-warm-900 transition-colors hover:text-brand-600"
								onClick={() => {
									closeMobileMenu()
									onOpenAuth?.()
								}}
								type="button"
							>
								Sign In
							</button>
						)}
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
