import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { generateMockProject, generateMockProjectsArray } from './generators.js'

const app = express()
const port = 4000
const TEST_USER = 'testUser123'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/projects', (request, response) => {
  const { limit } = request.query
  console.log()
  response.status(200).json({
    projects: generateMockProjectsArray(
      parseInt(String(limit !== undefined ? limit : '0')),
      {
        userId: TEST_USER,
      }
    ),
  })
})

app.get('/api/projects/:slug', (request, response) => {
  const { slug } = request.params
  response.status(200).json({
    project: generateMockProjectsArray(0, {
      userId: TEST_USER,
    }).find((project) => project.slug === slug),
  })
})

app.post('/api/projects', (request, response) => {
  console.log('POST projects', request.body.project_title)
  const title = request.body.project_title
  const description = request.body.project_description
  const project = generateMockProject({
    userId: TEST_USER,
    taskCount: 0,
    projectData: { title, description },
  })
  response.status(201).json({ project })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
