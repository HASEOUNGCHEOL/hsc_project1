import React, { useEffect, useState } from 'react';
import WebSocket from 'isomorphic-ws'; // 웹소켓 라이브러리

const MyWebSocket = () => {
  const [stockData, setStockData] = useState(null); // 주가 데이터를 저장할 상태 변수

  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000'); // 웹소켓 서버 주소

    ws.onopen = () => {
      console.log('WebSocket connection established');

      // 웹소켓을 통해 주가 데이터를 요청
      const requestData = JSON.stringify({
        header: {
          approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8', // 승인 키
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STASP0', // 주식 호가 데이터 요청
            tr_key: '005930', // 삼성전자 종목 코드 (예시)
          },
        },
      });

      ws.send(requestData); // 요청 전송
    };

    ws.onmessage = (event) => {
      let receivedData;
      try {
        receivedData = JSON.parse(event.data); // 데이터 파싱
      } catch (e) {
        console.error("Error parsing data:", e);
        return; // 파싱 오류 시 종료
      }

      if (receivedData && receivedData.body) {
        const rt_cd = receivedData.body.rt_cd;
        if (rt_cd === '0') {
          // 주가 데이터를 설정 상태 변수에 저장
          setStockData(receivedData.body.output); 
        } else {
          console.error('Subscription failed:', receivedData.body.msg1);
        }
      } else {
        console.error("Invalid data structure");
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
    };
  }, []); // 컴포넌트 마운트 시에만 실행

  return (
    <div>
      <h2>Stock Information</h2>
      {stockData ? (
        <div>
          <p>Stock Code: {stockData.tr_key}</p> 
          <p>Other Data: ...</p> {/* 데이터 처리 */}
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  ); 
};

export default MyWebSocket;
