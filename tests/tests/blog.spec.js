const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { waitForDebugger } = require('inspector')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
  
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = await page.locator('.info')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })
})
describe('Blog', () => {
  test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    
    await createBlog(page, 'test title','test author', 'test url')
    const Div = await page.locator('.info')
    await expect(Div).toHaveCSS('border-style', 'solid')
    await expect(Div).toHaveCSS('color', 'rgb(0, 128, 0)')
    await expect(page.getByText('A new blog test title by test author added')).toBeVisible()    
  })
  test('a new blog can be edited', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')

    await createBlog(page, 'test title111','test author', 'test url')
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByRole('button', { name: 'view' }).click()
 
    await expect(page.getByText('Likes: 1')).toBeVisible()
  })
  test('the user who added the blog can delete the blog', async ({ page }) => {
    const blogName = 'test title'
    const authorName = 'test author'
    await loginWith(page, 'mluukkai', 'salainen')

    await createBlog(page, blogName,authorName, 'test url')
    await expect(page.getByText( `${blogName} ${authorName}`)).toBeVisible()
    
    page.on('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'remove' }).click()
   
    await expect(page.getByText(`${blogName} by ${authorName} has been removed`)).toBeVisible()
    
    await expect(page.getByText(`${blogName} ${authorName}`)).not.toBeVisible()

  })
  
})
})