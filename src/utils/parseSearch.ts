export const parseSearch = () => {
  const search = window.location.search
  if (!(search && search.indexOf('=') > -1)) return {}
  search.replace(/^\?/, '').split('&').reduce((prev, cur) => {
    const [name, ...value] = cur.split('=')
    return {...prev, [name.trim()]: value.join('=')}
  }, {})
}