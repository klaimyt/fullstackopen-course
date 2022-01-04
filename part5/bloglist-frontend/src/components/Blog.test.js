import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import axios from 'axios'

jest.mock('axios')

describe('<Blog />', () => {
  let component
  let likeHandler

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Fullstack open',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps',
    likes: 10000,
    id: 12321,
    user: { id: 1233333 },
  }

  beforeEach(() => {
    axios.put.mockResolvedValue({ data: 'hello' })
    likeHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        handleBlogUpdate={likeHandler}
        handleBlogRemove={() => {}}
        handleNotification={() => {}}
      />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')

    const div = component.container.querySelector('.blog')
    expect(div).toBeTruthy()
  })

  test('Renders only title and author', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Fullstack open'
    )

    const detail = component.container.querySelector('.detail')
    expect(detail).toBeFalsy()
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('After clicking the button details displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const detail = component.container.querySelector('.detail')
    expect(detail).toBeTruthy()
    expect(detail).toHaveTextContent(/likes 10000/i)
  })

  test('After clicking like button event handler get called', async () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.detail button')
    expect(likeButton).toBeTruthy()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    await tick()
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})

// Helper function from https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that
function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}