import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebSocket from 'isomorphic-ws';

// 전역 변수를 컴포넌트 상태로 변경
const MyComponent = () => {
  const [stockCode1, setStockCode1] = useState('');
  const [stockCode2, setStockCode2] = useState('');
  const [htsId, setHtsId] = useState('');
  const [logMessages, setLogMessages] = useState([]);
  const [approvalKey, setApprovalKey] = useState('');

  const gAppKey = 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8';
  const gAppSecret = 'eyTd2RBOAr654UMW0qMbpMVW5vEq3hAFlz2hHN5wYoZ0fo31jGKvWCd8m0oD8aWNnRyLwRyZYfGe++eyt6/azuxJSnIbO1Fb/rilVfvjQA+/AaGDPCjkmTf/IzrjWqpP8gWc2LKl3EMrsCYBSvA1MU/tYUyoaQvdAQywZ4OCHXZ2nsZmONI==';

  // WebSocket 설정
  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000');

    ws.onopen = () => {
      addLog('[Connection OK]');
    };

    ws.onclose = (e) => {
      addLog('[CONNECTION CLOSED]');
    };

    ws.onerror = (e) => {
      addLog(`[ERROR] ${e.message}`);
    };

    ws.onmessage = (e) => {
      const receivedData = e.data;
      const parsedData = filterUnicode(receivedData);
      // 로그 기록
      addLog(`[RECV] ${receivedData.length} ${receivedData}`);
    };

    return () => {
      ws.close(); // 컴포넌트 언마운트 시 웹소켓 연결 종료
    };
  }, []);

  // 로그 추가
  const addLog = (message) => {
    setLogMessages((prev) => [...prev, message]);
  };

  // 승인 키 가져오기
  useEffect(() => {
    const getApprovalKey = async () => {
      try {
        const response = await axios.post(
          'https://openapi.koreainvestment.com:9443/oauth2/Approval',
          {
            grant_type: 'client_credentials',
            appkey: gAppKey,
            secretkey: gAppSecret,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setApprovalKey(response.data.approval_key);
      } catch (error) {
        addLog(`Error during approval key retrieval: ${error.message}`);
      }
    };

    getApprovalKey();
  }, []);

  // 유니코드 필터링 함수
  const filterUnicode = (quoted) => {
    const escapable = /[\x00-\x1f\ud800-\udfff\u200c\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;
    return escapable.test(quoted) ? quoted.replace(escapable, '') : quoted;
  };

  return (
    <div>
      <h2>Log Output</h2>
      {logMessages.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}

      <input
        type="text"
        value={stockCode1}
        onChange={(e) => setStockCode1(e.target.value)}
      />

      <input
        type="text"
        value={stockCode2}
        onChange={(e) => setStockCode2(e.target.value)}
      />

      <input
        type="text"
        value={htsId}
        onChange={(e) => setHtsId(e.target.value)}
      />
    </div>
  );
};

export default MyComponent;
