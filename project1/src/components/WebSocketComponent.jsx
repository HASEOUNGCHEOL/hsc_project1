import React, { useEffect, useState } from 'react';

function WebSocketComponent() {
  const [websocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stockCode1, setStockCode1] = useState('005930');
  const [stockCode2, setStockCode2] = useState('000660');

  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000');

    ws.onopen = () => {
      console.log('WebSocket opened');
    };

    ws.onmessage = (e) => {
      setMessages((prevMessages) => [...prevMessages, e.data]);
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
  }, []);

  const handleStockRequest1 = () => {
    const message = {
      header: {
        approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8', // app key 
        custtype: 'P',
        tr_type: '1',
        'content-type': 'utf-8',
      },
      body: {
        input: {
          tr_id: 'H0STASP0',
          tr_key: stockCode1,
        },
      },
    };
    websocket.send(JSON.stringify(message));
  };

  const handleStockRequest2 = () => {
    const message = {
      header: {
        approval_key: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8',
        custtype: 'P',
        tr_type: '1',
        'content-type': 'utf-8',
      },
      body: {
        input: {
          tr_id: 'H0STASP0',
          tr_key: stockCode2,
        },
      },
    };
    websocket.send(JSON.stringify(message));
  };

  return (
    <div>
      <h2>WebSocket Test Page</h2>
      <div>
        <label>Stock Code 1:</label>
        <input
          type="text"
          value={stockCode1}
          onChange={(e) => setStockCode1(e.target.value)}
        />
        <button onClick={handleStockRequest1}>Request Stock 1</button>
      </div>
      <div>
        <label>Stock Code 2:</label>
        <input
          type="text"
          value={stockCode2}
          onChange={(e) => setStockCode2(e.target.value)}
        />
        <button onClick={handleStockRequest2}>Request Stock 2</button>
      </div>
      <div>
        <h3>Messages</h3>
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
