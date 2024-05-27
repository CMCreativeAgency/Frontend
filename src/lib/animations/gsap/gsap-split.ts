import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

export function gsapSplit(data: HTMLElement, type: string, wrapper: string) {
  const splited = new SplitText(data, {
    type: type,
    tag: 'div',
    linesClass: wrapper ? 'lines-wrapper' : 'lines',
    wordsClass: wrapper ? 'words-wrapper' : 'words',
    charsClass: wrapper ? 'chars-wrapper' : 'chars',
  }) as any

  wrapper &&
    new SplitText(splited[type], {
      type: type,
      tag: 'div',
      linesClass: 'lines',
      wordsClass: 'words',
      charsClass: 'chars',
    })
}
