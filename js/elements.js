SVG.Button = class extends SVG.G {
  text(str) {
    if (typeof str === 'undefined') return this.lbl.text()

    this.clear()

    this.rct = this.rect()
      .height(10).rx(5).fill('black')
    this.lbl = this.label(str)
      .fill('white')
      .center(0, 0)
    this.rct
      .width(this.lbl.length() + 10)
      .center(0, 0)

    this.css({cursor: 'pointer'})
      .pointerdown(() => {
        this.rct.fill('white')
        this.lbl.fill('black')
      })
      .on('pointerup pointerleave pointercancel', () => {
        this.rct.fill('black')
        this.lbl.fill('white')
      })
      .center(
        this.attr('cx'),
        this.attr('cy')
      )
    return this
  }

  act(fn) {
    return this.pointerup((e) => fn(this, e))
  }

  center(cx, cy) {
    return super
      .center(cx, cy)
      .attr({cx: cx, cy: cy})
  }
}

SVG.extend(SVG.Container, {
  button(str) {
    return this.put(new SVG.Button).text(str)
  }
})
