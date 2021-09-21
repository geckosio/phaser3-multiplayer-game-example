const fs = require('fs-extra')
const { resolve, join } = require('path')

const srcDir = join(resolve(), 'client', 'assets')
const destDir = join(resolve(), 'dist', 'assets')

console.log(srcDir, destDir)

// To copy a folder or file
fs.copy(srcDir, destDir, err => {
  if (err) return console.error(err)
  console.log('success!')
})
