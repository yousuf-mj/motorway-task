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

export const getVisitors = async (page, token) => {
  try {
    const url = `${
      process.env.MOTORWAY_API
    }/visits?page=${page}&token=${token}`;

    console.log(`getting all Visitors for page ${page}`);

    const data = await axios.get(url);

    return data.data;
  } catch (error) {
    throw new Error('Error getting visitors', error);
  }
};

export const getAll = async () => {
  const token = await getToken();
  let pageNumber = 1;
  const resultsOne = await getVisitors(pageNumber, token);

  const pages = pageCount(resultsOne.total);

  const visitors = [];

  while (pageNumber <= pages) {
    visitors.push(await getVisitors(pageNumber, token).then(data => data.data));
    pageNumber++;
  }

  return visitors.flat();
};

export const pageCount = total => {
  const resultsPerPage = 15;
  const pages = total / resultsPerPage;
  return Math.round(pages + 1);
};

export const formatResults = visitors => {
  return visitors
    .filter(visitor => {
      const day = new Date(visitor.date);
      return day.getDay() !== 6 && day.getDay() !== 0;
    })
    .map(visitor => visitor.name)
    .reduce((allNames, name) => {
      if (name in allNames) {
        allNames[name]++;
      } else {
        allNames[name] = 1;
      }
      return allNames;
    }, {});
};

const start = async () => {
  const visitors = await getAll();

  const format = formatResults(visitors);
  console.log(format);
  return format;
};

start();
