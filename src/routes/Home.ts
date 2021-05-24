const prettifyRoutes = (appRoutes) => {
  return appRoutes.filter(({ route }) => route).map(({ route: { path, methods } }) => ({
    methods,
    path,
  }))
}

const Home = (appRoutes) => (_, response) => {
  console.log(appRoutes)
  response.header(`Content-Type`, `application/json`)
  return response.status(200).json({
    message: `See the GitHub repository: https://github.com/hueyy/HungryHippo`,
    routes: prettifyRoutes(appRoutes)
  })
}

export default Home