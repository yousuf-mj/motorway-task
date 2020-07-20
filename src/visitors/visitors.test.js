import { getToken, getVisitors, formatResults } from './index';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

test('should fetch token', async () => {
  const token = 123;
  const resp = {
    data: {
      token
    }
  };

  axios.get.mockResolvedValue(resp);

  const result = await getToken();
  return expect(result).toEqual(token);
});

test('should fetch visitors', async () => {
  const mockData = {
    data: [
      { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
      { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' }
    ]
  };
  const mockPageNo = 1;
  const mockToken = 124;

  axios.get.mockResolvedValue(mockData);

  const result = await getVisitors(mockPageNo, mockToken);
  console.log(result);

  return expect(result).toEqual(mockData.data);
});

test('should format results', () => {
  const visitors = [
    { id: 1, name: 'Bill Murray', date: '2020-07-20T09:11:00' },
    { id: 1, name: 'Bill Murray', date: '2018-09-02T09:11:00' },
    { id: 2, name: 'John Doe', date: '2018-08-30T03:24:00' }
  ];

  const mockResults = {
    'Bill Murray': 1,
    'John Doe': 1
  };

  const result = formatResults(visitors);
  console.log(result);

  return expect(result).toEqual(mockResults);
});
