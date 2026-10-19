import assert from 'node:assert/strict'
import { createTopicSheetScrollCoordinator } from '../src/topic-sheet-scroll.js'

function createFixture({ scrollTop = 0, reducedMotion = false } = {}) {
  const element = { scrollTop }
  const value = {
    current: scrollTop,
    get() { return this.current },
    set(next) { this.current = next },
  }
  const animations = []
  const coordinator = createTopicSheetScrollCoordinator({
    elementRef: { current: element },
    scrollValue: value,
    reducedMotion,
    spring: { type: 'spring', duration: 0.5, bounce: 0 },
    animateValue: (motionValue, target, options) => {
      const animation = {
        stopped: false,
        step(next) {
          if (this.stopped) return
          motionValue.set(next)
          options.onUpdate(next)
        },
        finish() {
          if (this.stopped) return
          motionValue.set(target)
          options.onUpdate(target)
          options.onComplete()
        },
        stop() { this.stopped = true },
      }
      animations.push(animation)
      return animation
    },
  })
  return { element, value, animations, coordinator }
}

const collapsed = createFixture({ scrollTop: 277.5 })
collapsed.coordinator.settle(0)
assert.equal(collapsed.coordinator.isAnimating(), true)
collapsed.animations[0].step(110)
assert.equal(collapsed.element.scrollTop, 110)
assert.equal(collapsed.value.get(), 110)
collapsed.coordinator.cancel()
assert.equal(collapsed.animations[0].stopped, true)
collapsed.coordinator.settle(437)
assert.equal(collapsed.coordinator.isAnimating(), true, 'an interrupted return keeps its reset pending on reverse')
collapsed.animations[1].finish()
assert.equal(collapsed.element.scrollTop, 0)
assert.equal(collapsed.value.get(), 0)
assert.equal(collapsed.coordinator.isAnimating(), false)

const userTakesOver = createFixture({ scrollTop: 150 })
userTakesOver.coordinator.settle(0)
userTakesOver.animations[0].step(90)
userTakesOver.coordinator.cancel(true)
userTakesOver.coordinator.settle(437)
assert.equal(userTakesOver.element.scrollTop, 90, 'a deliberate recommendation scroll cancels the pending reset')
assert.equal(userTakesOver.animations.length, 1)

const top = createFixture({ scrollTop: 160 })
top.coordinator.settle(-232)
top.animations[0].finish()
assert.equal(top.element.scrollTop, 0, 'the top snap also clears scrolled recommendations')

const returned = createFixture({ scrollTop: 277.5 })
returned.coordinator.settle(0)
returned.animations[0].finish()
assert.equal(returned.element.scrollTop, 0, 'the default snap clears scrolled recommendations')

const expanded = createFixture({ scrollTop: 84 })
expanded.coordinator.settle(437)
assert.equal(expanded.element.scrollTop, 84, 'an ordinary expanded snap preserves recommendation position')
assert.equal(expanded.animations.length, 0)

const reduced = createFixture({ scrollTop: 84, reducedMotion: true })
reduced.coordinator.settle(0)
assert.equal(reduced.element.scrollTop, 0, 'reduced motion resets synchronously')
assert.equal(reduced.value.get(), 0)

console.log('Topic sheet scroll checks passed: default/top, interrupted reverse, expanded preservation and reduced motion.')
