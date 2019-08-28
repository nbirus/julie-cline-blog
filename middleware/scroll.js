export default function (params) {
  if (process.client) {
    let path = params.route.path
    return window.scrollTo({
      top: path.includes('/blog') || path.includes('/about') ? 200 : 0,
      behavior: 'smooth'
    })
  }
}