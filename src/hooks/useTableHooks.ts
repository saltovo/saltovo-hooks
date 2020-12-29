import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Method } from 'axios/index';

export function useTableHooks(localKey: string, defaultdata?: any) {
  const responseDefaultData: any = defaultdata ? defaultdata : {};
  //loading 状态
  const [loading, setLoading] = useState<boolean>(false);
  // 返回的数据
  const response = useRef<any>(responseDefaultData);
  //是否有Authorization
  const token = localKey || '';

  return (payload: any, url: string, method: Method) => {
    const [renderPayload, setRenderPayload] = useState<any>(payload);
    //缓存请求
    const render = useCallback(() => {
      //开始处理数据 变loading状态为true
      setLoading(!loading);
      //请求数据
      axios({
        headers: {
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

    useEffect(() => {
      /**
       * 使useTableHooks增加缓存能力
       * 当payload没有变化时，不触发更新。同时解决了之前使用常量Object报错的问题
       * 现阶段只支持object的比较，同时也用的JSON.stringify,后面打算手写lodash的isEqual来实现比较
       */
      const payloadSrting: string = JSON.stringify(payload);
      const renderPayloadString: string = JSON.stringify(renderPayload);
      if (payloadSrting != renderPayloadString) {
        setRenderPayload(payload);
      }
    }, [payload]);

    //返回的loading和res
    return {
      loading: loading,
      res: response.current,
    };
  };
}
