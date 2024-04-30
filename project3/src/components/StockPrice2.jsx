import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StockPrice2() {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/price');
        setPrice(response.data);
      } catch (error) {
        setError('주식 정보를 불러오는 중 에러가 발생했습니다.');
        console.error('Failed to fetch stock price:', error);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : <h1>삼성전자 현재 가격: {price ? price.필요한_필드명_입력 : '로딩 중...'}</h1>}
    </div>
  );
}

export default StockPrice2;
