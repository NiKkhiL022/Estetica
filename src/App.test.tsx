import { render } from "@testing-library/react"
import App from "./App"

test("renders Products page heading", () => {
  const { getByText } = render(<App />)
  expect(getByText(/Products/i)).toBeInTheDocument()
})
