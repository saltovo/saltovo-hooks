import React, { useEffect, useState, useCallback, useRef } from 'react'
import  axios  from 'axios'

export function useTableHooks(localKey, defaultdata) {
  //loading 状态
  const [loading, setLoading] = useState(false)
  // 返回的数据
  const response = useRef({})
  //是否有Authorization
  const token = localStorage.getItem(localKey) || ''

  return (payload, url, method) => {
    //缓存请求
    const render = useCallback(() => {
      //开始处理数据 变loading状态为true
      setLoading(!loading)
      //请求数据
      axios({
        'headers': {
          Authorization: `Bearer ${token}`
        },
        'url': url,
        'method': method,
        'data': payload
      }).then((res) => {
        //把请求返回的数据给response.current
        response.current = res.data.data
        //获得数据变loading为false 同时刷新response.current的数据
        setLoading(false)
      })
    }, [payload])

    useEffect(() => {
      //每当payload变化时重新请求数据
      response.current = defaultdata || []
      render()
    }, [payload])

    //返回的loading和res
    return {
      loading: loading,
      res: response.current
    }
  }
}