export default function (params) {
  if (process.client) {
    return window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}