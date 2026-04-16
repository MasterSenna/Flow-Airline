import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'netlify', 'functions')
mkdirSync(outDir, { recursive: true })

const wrapper = `export { reqHandler } from '../../dist/app/server/server.mjs'\n`
writeFileSync(join(outDir, 'server.mjs'), wrapper)
