import axios from "axios";

export const API = axios.create({
  baseURL: `https://problem.comento.kr`,
  header: { Accept: "application/json" },
});
export const LIST_ASC = `/api/list?page=1&ord=asc&category[]=1&category[]=2&category[]=3&limit=10`;
export const LIST_DESC = `/api/list?page=1&ord=desc&category[]=1&category[]=2&category[]=3&limit=10`;
export const FILTER = `/api/list?page=1&ord=asc&limit=10`;
export const CATEGORY = `/api/category`;
export const ADS = `/api/ads?page=1&limit=10`;
export const DETAIL = `/api/view`;
