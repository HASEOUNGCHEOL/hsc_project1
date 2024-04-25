import React, { useEffect } from 'react';
import WebSocket from 'isomorphic-ws'; // 웹소켓 라이브러리

const MyWebSockett = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000'); // 웹소켓 서버 주소

    ws.onopen = () => {
      console.log('WebSocket connection established');

      // 웹소켓을 통해 데이터를 전송
      const requestData = JSON.stringify({
        header: {
          approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8', // 외부에서 가져온 승인 키
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STASP0', // 예시로 주식 호가
            tr_key: '005930', // 예시 종목 코드
          },
        },
      });

      ws.send(requestData);
    };

    ws.onmessage = (event) => {
      const receivedData = event.data;
      console.log('Received data:', receivedData);

      // 수신된 데이터 처리
      // 이 부분에 데이터 분할 및 조건별 처리가 포함됩니다
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
    };
  }, []); // 컴포넌트 마운트 시에만 실행

  return <div>WebSocket Communication</div>; // JSX로 간단한 출력
};

export default MyWebSockett;
