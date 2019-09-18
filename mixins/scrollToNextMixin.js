export default {
  methods: {
    scrollToNext (event) {
      event.preventDefault()
      const nav = document.querySelector('#mainNav') || document
      const parent = this.getClosest(event.target, 'section')
      const next = parent.nextElementSibling
      const nextOffset = this.offset(next)
      const nextScrollToPosition = nextOffset.top - nav.offsetHeight
      window.scrollTo(0, nextScrollToPosition)
      // this.scrollToY(nextScrollToPosition, 1000, 'easeInOutSine') // See below
    },
    getClosest (el, selector) {
      // Element.matches() polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          function (s) {
            const matches = this.document.querySelectorAll(s)
            let i = matches.length
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1
          }
      }
      // Get the closest matching element
      for (; el && el !== document; el = el.parentNode) {
        if (el.matches(selector)) {
          return el
        }
      }
      return null
    },
    offset (el) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },
    // The following is from: https://stackoverflow.com/questions/12199363/scrollto-with-animation
    // It is not currently working due to undefined callback `tick`
    requestAnimFrame () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
    },
    scrollToY (scrollTargetY = 0, speed = 2000, easing = 'easeInOutSine') {
      // scrollTargetY: the target scrollY property of the window
      // speed: time in pixels per second
      // easing: easing equation to use
      const scrollY = window.scrollY || window.pageYOffset
      let currentTime = 0
      // min time .1, max time .8 seconds
      const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8))
      // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
      // const PI_D2 = Math.PI / 2
      const easingEquations = {
        easeOutSine (pos) {
          return Math.sin(pos * (Math.PI / 2))
        },
        easeInOutSine (pos) {
          return (-0.5 * (Math.cos(Math.PI * pos) - 1))
        },
        easeInOutQuint (pos) {
          if ((pos /= 0.5) < 1) {
            return 0.5 * (pos ** 5)
          }
          return 0.5 * (((pos - 2) ** 5) + 2)
        }
      }
      // add animation loop
      const tick = function () {
        currentTime += 1 / 60
        const p = currentTime / time
        const t = easingEquations[easing](p)
        if (p < 1) {
          this.requestAnimFrame(tick)
          window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
        } else {
          window.scrollTo(0, scrollTargetY)
        }
      }
      // call it once to get started
      tick()
    }
  }
}
