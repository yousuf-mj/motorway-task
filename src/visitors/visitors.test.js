import { getToken } from './index';
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
