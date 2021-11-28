/**
 * Adds 10 player to the scene
 */

import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  defaultViewport: { width: 896, height: 504 }
})

const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const randomTime = () => {
  return Math.random() * 2000 + 2000
}

const goRight = async page => {
  await page.keyboard.up('ArrowRight')
  await page.keyboard.down('ArrowLeft')
  await wait(randomTime())
}

const goLeft = async page => {
  await page.keyboard.up('ArrowLeft')
  await page.keyboard.down('ArrowRight')
  await wait(randomTime())
}

const newPage = async () => {
  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:1444/')

    await wait(randomTime() + 5000)
    await page.keyboard.down('ArrowUp')
    await wait(randomTime())

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
