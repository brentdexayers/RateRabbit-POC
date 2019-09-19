export default {
  methods: {
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
    }
  }
}
