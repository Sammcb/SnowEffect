// Snow effect
let snowflakes = []
let seed = 1
const lcg = x => seed = (1103515245 * x + 12345) % Math.pow(2, 31)
const rMax = Math.pow(2, 31) - 1
const rRange = (min, max) => lcg(seed) / rMax * (max - min) + min

function letItSnow() {
	const c = document.getElementById('snow')
	const ctx = c.getContext('2d')
	const scale = window.devicePixelRatio
	c.width = c.offsetWidth * scale
	c.height = c.offsetHeight * scale
	ctx.scale(scale, scale)
	ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
	setInterval(snow, 50, c, ctx)
}

function snow(c, ctx) {
	ctx.clearRect(0, 0, c.width, c.height)
	const newSnow = c.offsetWidth < 767 ? 4 : 10
	for (let i = 0; i <= newSnow; i++) {
		const x = c.offsetWidth / newSnow * i
		rRange(0, 50) < 0.5 && snowflakes.push({x, y: 0, r: rRange(5, 10), ox: x, ri: rRange(0, 1) < 0.5})
	}
	// Animate snowflakes
	snowflakes = snowflakes.map(({x, y, r, ox, ri}) => {
		const turn = Math.abs(rRange(Math.min(x, ox), Math.max(x, ox)) - x) > 30
		const newRi = !turn ? ri : !ri
		return {x: x + (ri ? 1 : -1) * rRange(0.1, 0.5), y: y + 0.5, r, ox, ri: newRi}
	})
	// Remove old snowflakes
	snowflakes = snowflakes.filter(({y}) => y < c.offsetHeight + 50)
	// Draw snowflakes
	snowflakes.forEach(({x, y, r}) => {
		ctx.beginPath()
		ctx.arc(x, y, r, 0, 2 * Math.PI)
		ctx.fill()
	})
}

function fixCanvas() {
	const c = document.getElementById('snow')
	const ctx = c.getContext('2d')
	const scale = window.devicePixelRatio
	c.width = c.offsetWidth * scale
	c.height = c.offsetHeight * scale
	ctx.scale(scale, scale)
	ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
}
