# saltovo

> saltovo&#x27;s hooks

[![NPM](https://img.shields.io/npm/v/saltovo.svg)](https://www.npmjs.com/package/saltovo) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save saltovo
```

## Usage

```jsx
import React, { useState } from 'react'

import {  useTableHooks } from 'saltovo'

const Example = () => {
 const [payload, setPayload] = useState({})
  const { loading, res } = useTableHooks(token)(payload, url, method)
  return (
    <div>
    {loading}
    {res}
    </div>
  )
}
```

## License

MIT © [](https://github.com/)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
