import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const client = resolve('dist/client')
await mkdir(client, { recursive: true })
const index = await readFile(resolve(client, 'index.html'))
await writeFile(resolve(client, '404.html'), index)
console.log('GitHub Pages: created dist/client/404.html fallback')
