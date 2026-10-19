export function createTopicSheetScrollCoordinator({ elementRef, scrollValue, animateValue, reducedMotion, spring }) {
  let animation = null
  let resetPending = false

  const stop = () => {
    animation?.stop()
    animation = null
  }

  const cancel = (userScroll = false) => {
    stop()
    if (userScroll) resetPending = false
  }

  const set = (value) => {
    stop()
    const element = elementRef.current
    if (element) element.scrollTop = value
    scrollValue.set(value)
  }

  const animateTo = (target) => {
    stop()
    const element = elementRef.current
    if (!element || Math.abs(element.scrollTop - target) < 0.5 || reducedMotion) {
      if (element) element.scrollTop = target
      scrollValue.set(target)
      return
    }

    animation = animateValue(scrollValue, target, {
      ...spring,
      onUpdate: (value) => { element.scrollTop = value },
      onComplete: () => {
        element.scrollTop = target
        scrollValue.set(target)
        animation = null
      },
    })
  }

  const settle = (sheetTarget) => {
    if (sheetTarget <= 0) resetPending = true
    if (!resetPending) return
    resetPending = false
    animateTo(0)
  }

  /* 手动上拉 sheet 时同步把列表带回顶部；松手若弹回展开态，再恢复到原来的滚动位置 */
  const restore = (target) => {
    resetPending = false
    animateTo(target)
  }

  return { cancel, set, settle, restore, isAnimating: () => animation !== null }
}
