import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewBlog from './CreateNewBlog'

describe('<Create New Blog />', () => {
  let component
  let newBlogHandler

  beforeEach(() => {
    newBlogHandler = jest.fn()
    component = render(<CreateNewBlog createNewBlog={newBlogHandler} />)
  })

  test('renders content', () => {
    expect(component.container).toBeTruthy()
  })

  test('New blog handler recieve right data from form', () => {
    const form = component.container.querySelector('form')

    const title = component.container.querySelector('input[name="title"]')
    const author = component.container.querySelector('input[name="author"]')
    const url = component.container.querySelector('input[name="url"]')

    fireEvent.change(title, {
      target: { value: 'Testing form' },
    })
    fireEvent.change(author, {
      target: { value: 'Testing author' },
    })
    fireEvent.change(url, {
      target: { value: 'Testing url' },
    })

    fireEvent.submit(form)
    expect(newBlogHandler.mock.calls).toHaveLength(1)
    expect(newBlogHandler.mock.calls[0][0]).toEqual({
      title: 'Testing form',
      author: 'Testing author',
      url: 'Testing url',
    })
  })
})
