import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataComponent = ({ stockCode }) => {
    const [price, setPrice] = useState(null);  // 주가 정보를 저장할 상태 변수

    useEffect(() => {
        // Flask API에 GET 요청
        axios.get(`http://localhost:5000/api/price/${stockCode}`)
            .then((response) => {
                setPrice(response.data);  // 응답 데이터를 상태 변수에 저장
            })
            .catch((error) => {
                console.error('Error fetching stock price:', error);  // 에러 처리
            });
    }, [stockCode]);  // stockCode가 변경될 때마다 실행

    return (
        <div>
            {price ? (
                <p>Stock Price: {price.price}</p>  // 주가 정보 표시
            ) : (
                <p>Loading...</p>  // 로딩 중 메시지
            )}
        </div>
    );
};

export default DataComponent;  // 컴포넌트 내보내기
