const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get('/api/price', async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://openapi.koreainvestment.com:9443',
      headers: {
        Authorization: `eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjMzMDViYTRlLTU1ZTAtNDY5MC1iNzQ5LWMzYzgxNDI3MTYxMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxNDUzMjkyOSwiaWF0IjoxNzE0NDQ2NTI5LCJqdGkiOiJQU0g4ZU5IaDlET0VHUVpnT2hpUHZ1VmdLb1ViNnFyQmdPczgifQ.mSAJISlicRNEBQdhOoHH64yVXVaQ77OXh6EVBPfZpyLFJehfv4pxdJd70KBlIh_RURqkiLVpzEH3q6FuyVhItQ`,
        appKey: 'PSH8eNHh9DOEGQZgOhiPvuVgKoUb6qrBgOs8',
        appSecret: 'eyTd2RBOAr654UMW0qMbpMVW5vEq3hAFlz2hHN5wYoZ0fo31jGKvWCd8m0oD8aWNnRyLwRyZYfGe++eyt6/azuxJSnIbO1Fb/rilVfvjQA+/AaGDPCjkmTf/IzrjWqpP8gWc2LKl3EMrsCYBSvA1MU/tYUyoaQvdAQywZ4OCHXZ2nsZmONI=',
      },
      params: {
        fid_cond_mrkt_div_code: 'J',
        fid_input_iscd: '005930' // 예시로 삼성전자 종목 코드
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('API call failed:', error);
    res.status(500).send('API call failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
