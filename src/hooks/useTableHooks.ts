import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Method } from 'axios/index';
import { useDeepCompareState } from './useDeepCompareState';

interface UseTableHooksProps {
  loading: boolean;
  res: any;
}

export function useTableHooks(localKey?: string, defaultdata?: any) {
  const responseDefaultData: any = defaultdata ? defaultdata : {};
  //loading 状态
  const [loading, setLoading] = useState<boolean>(false);
  // 返回的数据
  const response = useRef<any>(responseDefaultData);
  //是否有Authorization
  const token = localKey || '';

  return (payload: any, url: string, method: Method): UseTableHooksProps => {
    const renderPayload = useDeepCompareState(payload);
    // const [renderPayload, setRenderPayload] = useState<any>(payload);
    //缓存请求
    const render = useCallback(() => {
      //开始处理数据 变loading状态为true
      setLoading(!loading);
      //请求数据
      axios({
        headers:
          token.length === 0
            ? {}
            : {
                Authorization: `Bearer ${token}`,
              },
        url: url,
        method: method,
        data: payload,
      }).then((res) => {
        //把请求返回的数据给response.current
        response.current = res.data.data;
        //获得数据变loading为false 同时刷新response.current的数据
        setLoading(false);
      });
    }, [renderPayload]);

    useEffect(() => {
      //每当payload变化时重新请求数据
      // if (Object.keys(response.current).length != 0) {
      //   response.current = defaultdata || {}
      // }
      render();
    }, [renderPayload]);

    //返回的loading和res
    return {
      loading: loading,
      res: response.current,
    };
  };
}
