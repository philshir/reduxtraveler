let testing = document.querySelector(".testing")
    let monsterScroll = document.querySelectorAll(".places")

    function inViewPort(el) {
        let rect = el.getBoundingClientRect()
        return (
          (rect.top <= 0 && rect.bottom >= 0) ||
          (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
          (rect.top >= 0 && rect.bottom <= window.innerHeight)
        )
    }
    
    function moveHeader() {

        monsterScroll.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('appear')
        : item.classList.remove('appear')
    )
        window.requestAnimationFrame(moveHeader)
    }
    
    window.requestAnimationFrame(moveHeader)
