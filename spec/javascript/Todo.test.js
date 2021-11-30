/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import Todo, { NewModal } from "app/javascript/components/Todo"

describe("Todoのレンダー", () => {

  let container = null

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  });

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  });

  it("Todo renders propsがある場合", () => {
    const todos = [
      { id: 1, titile: "text1", content: "content1" },
      { id: 2, titile: "text2", content: "content2" } 
    ]
    act(() => {
      render(<Todo todos={ todos }/>, container);
    });
    expect(container.textContent).toMatch(/Delete/);
  })

  it("Todo renders snapshot", () => {
    const todos = [
      { id: 1, titile: "text1", content: "content1" },
      { id: 2, titile: "text2", content: "content2" } 
    ]
    act(() => {
      render(<Todo todos={ todos }/>, container)
    });
    expect(container).toMatchSnapshot()
  })

  it("Todo renders propsがない場合", () => {
    const todos = []
    act(() => {
      render(<Todo todos={ todos }/>, container)
    });
    expect(container.textContent).toBe("TODOnew")
  })
})
