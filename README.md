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

import {  useTableHooks , UseBool } from 'saltovo'

const Example = () => {
 const [payload, setPayload] = useState(
    {
      ExpertType: '',
      pageSize: 100,
      pageIndex: 1,
      IsOuterStatus: 1,
    }
  )
  const { loading, res } = useTableHooks('ODMTOKEN')(payload, `${secodm}/api/v1/Expert/ExpertUser/GetExpertUserList`, 'post')
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
