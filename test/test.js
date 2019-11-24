/**
 * Adds 10 player to the scene
 */

const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 896, height: 504 }
  })

  const randomTime = () => {
    return Math.random() * 2000 + 2000
  }

  const goRight = async page => {
    await page.keyboard.up('ArrowRight')
    await page.keyboard.down('ArrowLeft')
    await page.waitFor(randomTime())
  }

  const goLeft = async page => {
    await page.keyboard.up('ArrowLeft')
    await page.keyboard.down('ArrowRight')
    await page.waitFor(randomTime())
  }

  const newPage = async () => {
    try {
      const page = await browser.newPage()
      await page.goto('http://localhost:1444/')

      await page.waitFor(randomTime() + 5000)
      await page.keyboard.down('ArrowUp')
      await page.waitFor(randomTime())

      await goLeft(page)
      await goRight(page)
      await goLeft(page)
      await goRight(page)
      await goLeft(page)
      await goRight(page)
      await goLeft(page)
      await goRight(page)
      await goLeft(page)
      await goRight(page)

      await browser.close()
    } catch (error) {
      console.error(error.message)
    }
    process.exit()
  }

  for (let i = 0; i < 10; i++) {
    newPage()
  }
})()
