import { generateMockProject, generateMockTask, setSeed } from '.'

describe('generateMockTask', () => {
  beforeEach(() => {
    setSeed(1234)
  })

  test('creates a mock task', () => {
    const mockTask = generateMockTask()
    expect(mockTask.id).toBe('379d79cc-cd42-443c-adf2-e15087a5bc51')
    expect(mockTask.userId).toBe('08700c4e-35b9-4e1f-a51e-6a768cc5796d')
    expect(mockTask.title).toBe('Random task')
  })

  test('creates a task with the correct userId if provided', () => {
    const mockUserId = 'mockUser123'
    const mockTask = generateMockTask({ userId: mockUserId })
    expect(mockTask.userId).toBe(mockUserId)
  })
})

describe('generateMockProject', () => {
  beforeEach(() => {
    setSeed(1234)
  })

  test('creates a mock project', () => {
    const mockProject = generateMockProject()
    expect(mockProject.id).toBe('08700c4e-35b9-4e1f-a51e-6a768cc5796d')
    expect(mockProject.userId).toBe('379d79cc-cd42-443c-adf2-e15087a5bc51')
    expect(mockProject.title).toBe('Ameliorated homogeneous knowledge base')
  })

  test('creates a mock project with the correct userId if provided', () => {
    const mockUserId = 'mockUser123'
    const mockProject = generateMockProject({ userId: mockUserId })
    expect(mockProject.userId).toBe(mockUserId)
  })

  test('creates a mock project with a specified amount of tasks', () => {
    const mockUserId = 'mockUser123'
    const mockProject = generateMockProject({
      userId: mockUserId,
      taskCount: 5,
    })
    expect(mockProject.tasks.length).toBe(5)
    expect(mockProject.tasks[0].userId).toBe(mockUserId)
    expect(mockProject.tasks[0].projectId).toBe(mockProject.id)
  })
})
