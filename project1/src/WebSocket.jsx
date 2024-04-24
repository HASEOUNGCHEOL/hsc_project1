import React, { useEffect } from 'react';

const WebSocket = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000'); // 웹소켓 서버 주소

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      // 주어진 코드에서 메시지 처리를 구현합니다.
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket 연결 상태를 확인하세요.</div>;
};

export default WebSocket;
