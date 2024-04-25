import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // WebSocket 연결 생성
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000');

    // WebSocket 열림 이벤트
    ws.onopen = () => {
      // 서버에 요청을 보내는 메시지
      const message = JSON.stringify({
        header: {
          approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8',
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0',
            tr_key: '035900',
          },
        },
      });
      ws.send(message); // 메시지 전송
    };

    // WebSocket 메시지 수신 이벤트
    ws.onmessage = (event) => {
      const responseData = JSON.parse(event.data); // 메시지 파싱
      setData(responseData); // 데이터 상태 업데이트
      setLoading(false); // 로딩 완료
    };

    // WebSocket 오류 처리
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // WebSocket 연결 해제 이벤트
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // 컴포넌트가 언마운트되면 WebSocket 연결 해제
    return () => {
      ws.close();
    };
  }, []); // 컴포넌트 마운트 시 실행

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>실시간 주가</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* JSON 형태로 데이터 출력 */}
    </div>
  );
};

export default WebSocketComponent;
