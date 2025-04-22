import axios, { AxiosRequestConfig, Method } from "axios";

export const apiConnector = async (
    method: Method,
    url: string,
    bodyData: any = null,
    headers: Record<string, string> = {},
    baseURL: string | undefined
  ) => {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: bodyData,
      baseURL: baseURL,
    };
  
    return axios(config);
  };