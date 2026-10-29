import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = 'public/images'
const BACKUP = 'originals'
const QUALITY = 82
const MAX_WIDTH_BANNER = 2000 // wide banner images
const MAX_WIDTH_DEFAULT = 1400 // everything else

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name)
      return e.isDirectory() ? walk(full) : full
    }),
  )
  return files.flat()
}

const kb = (n) => (n / 1024).toFixed(0)

async function main() {
  const all = await walk(ROOT)
  const sources = all.filter((f) => /\.(png|jpe?g)$/i.test(f))

  if (sources.length === 0) {
    console.log('No PNG or JPG files found in public/images.')
    return
  }

  let before = 0
  let after = 0

  for (const file of sources) {
    const rel = path.relative(ROOT, file)
    const isBanner = rel.split(path.sep)[0] === 'banners'
    const out = file.replace(/\.(png|jpe?g)$/i, '.webp')

    const sizeBefore = (await fs.stat(file)).size

    await sharp(file)
      .rotate()
      .resize({
        width: isBanner ? MAX_WIDTH_BANNER : MAX_WIDTH_DEFAULT,
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY })
      .toFile(out)

    const sizeAfter = (await fs.stat(out)).size
    before += sizeBefore
    after += sizeAfter

    // move the original to originals/ so nothing is lost
    const backupPath = path.join(BACKUP, rel)
    await fs.mkdir(path.dirname(backupPath), { recursive: true })
    await fs.rename(file, backupPath)

    console.log(`${rel}  ${kb(sizeBefore)} KB -> ${kb(sizeAfter)} KB`)
  }

  console.log('')
  console.log(`Converted ${sources.length} images`)
  console.log(`Total: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`)
  console.log('Originals are saved in the "originals" folder.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})