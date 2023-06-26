import { rest } from 'msw'
import { generateMockProjectsArray } from './generators'

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects`,
    (request, response, context) => {
      const limit = parseInt(request.url.searchParams.get('limit') ?? '0')

      return response(
        context.status(200),
        context.json({
          projects: generateMockProjectsArray(limit, { userId: 'testUser123' }),
        })
      )
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/:slug`,
    (request, response, context) => {
      const { slug } = request.params
      console.log('*** slug:', slug)

      return response(
        context.status(200),
        context.json({
          project: generateMockProjectsArray(0, {
            userId: 'testUser123',
          }).find((project) => project.slug === slug),
        })
      )
    }
  ),
]
