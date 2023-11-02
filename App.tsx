import React, { useState } from 'react'

export const App = (): JSX.Element => {
  const [count, setCount] = useState(0)
  return <div><p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>+</button></div>
}