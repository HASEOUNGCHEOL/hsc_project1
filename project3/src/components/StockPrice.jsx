import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StockPrice() {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('https://openapi.koreainvestment.com:9443', {
            timeout : 5000,
            headers: {
            Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjMzMDViYTRlLTU1ZTAtNDY5MC1iNzQ5LWMzYzgxNDI3MTYxMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNDUzMjkyOSwiaWF0IjoxNzE0NDQ2NTI5LCJqdGkiOiJQU0g4ZU5IaDlET0VHUVpnT2hpUHZ1VmdLb1ViNnFyQmdPczgifQ.mSAJISlicRNEBQdhOoHH64yVXVaQ77OXh6EVBPfZpyLFJehfv4pxdJd70KBlIh_RURqkiLVpzEH3q6FuyVhItQ`,
            appKey: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8',
            appSecret: 'eyTd2RBOAr654UMW0qMbpMVW5vEq3hAFlz2hHN5wYoZ0fo31jGKvWCd8m0oD8aWNnRyLwRyZYfGe++eyt6/azuxJSnIbO1Fb/rilVfvjQA+/AaGDPCjkmTf/IzrjWqpP8gWc2LKl3EMrsCYBSvA1MU/tYUyoaQvdAQywZ4OCHXZ2nsZmONI=',
          },
          params: {
            fid_cond_mrkt_div_code: 'J',
            fid_input_iscd: '005930' // 삼성전자 종목 코드
          }
        });
        setPrice(response.data); // 응답 데이터를 상태에 저장
      } catch (error) {
        setError('주식 정보를 불러오는 중 에러가 발생했습니다.');
        console.error('Failed to fetch stock price:', error);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : <h1>삼성전자 현재 가격: {price ? price.여기에_필요한_필드명_입력 : '로딩 중...'}</h1>}
    </div>
  );
}

export default StockPrice;
