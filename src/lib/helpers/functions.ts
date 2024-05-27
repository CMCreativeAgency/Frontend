export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function splitArray(array: any[], callback?: Function) {
  const split = Math.ceil(array.length / 2)
  let result = [array.slice(0, split), array.slice(split)]

  if (callback) {
    result = callback(result)
  }

  return result
}

export function reverseArray(array: any[]) {
  const newArray = []

  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i])
  }

  return newArray
}

export function iOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

export function aspectHandler(aspectRatios: any) {
  return Object.keys(aspectRatios).reduce(
    (prev: any, curr: any) =>
      aspectRatios[curr]
        ? {
            ...prev,
            [curr]: aspectRatios[curr],
          }
        : prev,
    {}
  )
}
