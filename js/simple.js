+(function (win, doc) {

  window.requestAnimFrame = ( function () {
    return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60)
      }
  })()
  var goTop = function () {
    var top = document.body.scrollTop
    var left = document.body.scrollLeft
    window.scrollTo(left, top-100)
    if (top > 0) {
      requestAnimationFrame(goTop)
    }
  }

  var simple = {
    init: function () {
      this.bind()
      this.initSidebar()
    },
    bind: function () {
      var self = this
      $(doc).on('click', '#nav-btn' , function () {
        self.toggleBodyClass()
      })
      .on('click', '#back-top', function () {
        requestAnimationFrame(goTop)
      })
    },
    // sidebar状态机
    sidebarState: (function () {
      var state = false
      var sideState = localStorage.getItem('sidebarState')
      if (sideState != undefined) {
        state = !(sideState == 'true')
      }
      return function () {
        return state = !state
      }
    })(),
    // sidebar 初始化
    initSidebar: function() {
      var sidebarState = localStorage.getItem('sidebarState')
      if (sidebarState) {
        this.toggleBodyClass(sidebarState)
      }
      return
    },
    toggleBodyClass: function (tag) {
      var b = $('body')
      var state = this.sidebarState()
      if (tag != undefined) {
        tag == 'true' ? b.addClass('sideShow') : b.removeClass('sideShow')
        return
      }
      state ? b.addClass('sideShow') : b.removeClass('sideShow')
      localStorage.setItem('sidebarState', state)
      return
    }
  }
  simple.init()
})(window, document)