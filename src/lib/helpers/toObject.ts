export function strToObj(string: string) {
  console.log(
    string
      .split(',')
      .reduce((prev, curr) => ({ ...prev, [curr.split(':')[0]]: curr.split(':')[1] }), {})
  )
}
