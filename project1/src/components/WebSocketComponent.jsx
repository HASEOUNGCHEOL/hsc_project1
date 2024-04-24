import React, { useEffect, useState } from 'react';

function WebSocketComponent() {
  const [websocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stockCode1, setStockCode1] = useState('352820'); 
  const [stockCode2, setStockCode2] = useState('005930'); // 이 부분에서 'forelle1' 오류를 수정

  const sendStockRequest = (stockCode) => {
    if (websocket) {
      const message = {
        header: {
          approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8', 
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0', 
            tr_key: stockCode,
          },
        },
      };
      websocket.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000'); 

    ws.onopen = () => {
      console.log('WebSocket opened');
      sendStockRequest(stockCode1); 
      sendStockRequest(stockCode2);
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.body && message.body.output) {
        const stockPrice = message.body.output.STCK_PRPR; 
        setMessages((prevMessages) => [...prevMessages, stockPrice]); 
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, [sendStockRequest, stockCode1, stockCode2]); 

  return (
    <div> 
      <h2>실시간 주가 데이터</h2> 
      <div> 
        <label>Stock Code 1:</label> 
        <input 
          type="text" 
          value={stockCode1} 
          onChange={(e) => setStockCode1(e.target.value)} 
        /> 
        <button onClick={() => sendStockRequest(stockCode1)}>Request Stock 1</button> 
      </div> 
      <div> 
        <label>Stock Code 2:</label> 
        <input 
          type="text" 
          value={stockCode2} 
          onChange={(e) => setStockCode2(e.target.value)} 
        /> 
        <button onClick={() => sendStockRequest(stockCode2)}>Request Stock 2</button> 
      </div> 
      <div> 
        <h3>Received Messages</h3> 
        <ul> 
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li> 
          ))} 
        </ul> 
      </div> 
    </div> 
  );
}

export default WebSocketComponent; 
