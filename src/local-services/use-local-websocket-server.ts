import { useEffect } from 'react';

const WEBSOCKET_SERVER_URL = 'ws://localhost:5001';

// @TODO fix payload type
export function useLocalWebsocketServer(
  callback: (payload: any) => void,
  deps: any[] = [],
) {
  const effectDependencies = [...deps];

  useEffect(() => {
    const wsInstance = new WebSocket(WEBSOCKET_SERVER_URL);

    wsInstance.onmessage = (event: MessageEvent<string>) => {
      // it has message with type, but it's not used right now
      const { data } = JSON.parse(event.data);

      callback(data);
    };

    return () => {
      // Close only if open
      // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
      if (wsInstance.readyState === 1) {
        wsInstance.close();
      }
    };
    // I know better what's inside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, effectDependencies);
}
