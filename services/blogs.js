import blogsEn from '~/contents/blogs.js'


export async function getAllBlogs() {
  const blogs = getBlogRoutes(blogsEn)

  async function asyncImport (blogName) {
    const wholeMD = await import(`~/contents/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog))).then((res) => {
    return {
      blogs: res
    }
  })
}

export async function getBlogSection(section) {

  const blogs = blogsEn[section]

  async function asyncImport (blogName) {
    const wholeMD = await import(`~/contents/blog/${section}/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog))).then((res) => {
    return {
      blogs: res
    }
  })
}


function getBlogRoutes(blogs) {
  let routes = []
  for (let section in blogs) {
    blogs[section].forEach(blog => {
      routes.push(`${section}/${blog}`)
    })
  }
  return routes
}