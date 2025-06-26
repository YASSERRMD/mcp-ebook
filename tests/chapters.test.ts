import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

import { getAllChapters } from '../src/lib/chapters'

let tempDir: string
let originalCwd: string

beforeAll(async () => {
  originalCwd = process.cwd()
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'chapters-test-'))
  const contentDir = path.join(tempDir, 'src/content')
  await fs.mkdir(contentDir, { recursive: true })

  const files: Record<string, string> = {
    'chapter2_second.md': '# Second',
    'chapter1_first.md': '# First',
    'chapter10_tenth.md': '# Tenth'
  }

  await Promise.all(
    Object.entries(files).map(([name, content]) =>
      fs.writeFile(path.join(contentDir, name), content)
    )
  )

  process.chdir(tempDir)
})

afterAll(async () => {
  process.chdir(originalCwd)
  await fs.rm(tempDir, { recursive: true, force: true })
})

describe('getAllChapters', () => {
  it('returns sorted chapters with formatted titles', async () => {
    const chapters = await getAllChapters()
    expect(chapters).toEqual([
      { slug: 'chapter1_first', title: 'Chapter 1: First' },
      { slug: 'chapter2_second', title: 'Chapter 2: Second' },
      { slug: 'chapter10_tenth', title: 'Chapter 10: Tenth' }
    ])
  })
})
