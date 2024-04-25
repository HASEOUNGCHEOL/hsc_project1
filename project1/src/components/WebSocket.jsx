import React, { useEffect } from 'react';

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000'); // 웹소켓 서버 주소

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      // 여기에 메시지 처리 로직을 추가하세요.
      // 예를 들어, 상태 업데이트 등을 수행할 수 있습니다.
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // 컴포넌트가 언마운트되거나 재렌더링될 때 WebSocket 연결을 정리합니다.
    return () => {
      socket.close();
    };
  }, []); // 빈 배열을 전달하여 useEffect가 컴포넌트 마운트 시에만 실행되도록 설정합니다.

  return <div>WebSocket 연결 상태를 확인하세요.</div>;
};

export default WebSocketComponent;
