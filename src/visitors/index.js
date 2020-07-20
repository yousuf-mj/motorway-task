import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const getToken = async () => {
  const url = `${process.env.MOTORWAY_API}/login`;
  try {
    console.log(`getting login key`);
    const data = await axios.get(url);
    const key = data.data.token;

    return await key;
  } catch (error) {
    throw new Error('Error getting Token');
  }
};
