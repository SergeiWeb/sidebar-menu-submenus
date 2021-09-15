//* functions
const changesClass = (el, method, className) => {
	Array.isArray(className)
		? el.classList[method](...className)
		: el.classList[method](className)
}

const linkColor = document.querySelectorAll('.nav__link')
const collapseLinks = document.querySelectorAll('.collapse__link')

const body = document.getElementById('body-pd')
const navbar = document.getElementById('navbar')
const toggle = document.getElementById('nav-toggle')
const collapseMenus = document.querySelectorAll('.collapse__menu')
const collapseIcons = document.querySelectorAll('.collapse__link')

const tooltip = document.querySelector('.tooltip')

if (toggle && navbar && body) {
	toggle.addEventListener('click', () => {
		changesClass(body, 'toggle', 'body-pd')
		changesClass(navbar, 'toggle', 'expander')

		if (collapseMenus && collapseIcons) {
			collapseMenus.forEach(menu =>
				changesClass(menu, 'remove', 'show-collapse')
			)

			collapseIcons.forEach(icon => changesClass(icon, 'remove', 'rotate'))
		}

		if (tooltip) {
			navbar.classList.contains('expander')
				? changesClass(navbar, 'remove', 'tooltip')
				: changesClass(navbar, 'add', 'tooltip')
		}
	})
}

linkColor.forEach(link =>
	link.addEventListener('click', function(event) {
		event.preventDefault()
		linkColor.forEach(link => changesClass(link, 'remove', 'active-link'))
		changesClass(this, 'add', 'active-link')

		if (
			collapseMenus &&
			collapseIcons &&
			navbar.classList.contains('expander')
		) {
			if (this.classList.contains('collapse')) {
				collapseMenus.forEach(m => changesClass(m, 'remove', 'show-collapse'))
				collapseIcons.forEach(i => changesClass(i, 'remove', 'rotate'))
				const menu = this.querySelector('.collapse__menu')

				changesClass(menu, 'toggle', 'show-collapse')
				changesClass(menu.previousElementSibling, 'toggle', 'rotate')
			} else {
				collapseMenus.forEach(menu =>
					changesClass(menu, 'remove', 'show-collapse')
				)

				collapseIcons.forEach(icon => changesClass(icon, 'remove', 'rotate'))
			}
		}
	})
)

if (tooltip) {
	linkColor.forEach(container => {
		const tooltipItem = document.createElement('span')
		changesClass(tooltipItem, 'add', 'tooltip-item')

		tooltipItem.textContent = container.querySelector(
			'.nav__name'
		).textContent

		container.appendChild(tooltipItem)
	})
}
