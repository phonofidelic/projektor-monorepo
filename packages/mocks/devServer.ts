import express from 'express'
import { generateMockProjectsArray } from './generators.js'

const app = express()
const port = 4000

app.get('/api/projects', (request, response) => {
  const { limit } = request.query ?? '0'
  response.json({
    projects: generateMockProjectsArray(parseInt(String(limit)), {
      userId: 'testUser123',
    }),
  })
})

app.get('/api/projects/:slug', (request, response) => {
  const { slug } = request.params
  response.json({
    project: generateMockProjectsArray(0, {
      userId: 'testUser123',
    }).find((project) => project.slug === slug),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
