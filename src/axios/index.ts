import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { JsonObj } from "../networking/jsonObj";

const axios = require("axios").default;

export type RequestResponse = AxiosResponse<JsonObj>;
export type Instance = AxiosInstance;
export type RequestConfig = AxiosRequestConfig<JsonObj>;

export class AxiosInstanceFactory {
  #baseUrl: string = "";
  #timeout: number = 3000; // 3 seconds
  #headers: { [name: string]: string } = {};
  #params: { [name: string]: string } = {
    "content-type": "application/json",
  };

  static newInstance(): AxiosInstanceFactory {
    return new AxiosInstanceFactory();
  }

  setBaseUrl(url: string): AxiosInstanceFactory {
    this.#baseUrl = url;
    return this;
  }

  setTimeout(timeout: number): AxiosInstanceFactory {
    this.#timeout = timeout;
    return this;
  }

  setHeaders(headers: { [name: string]: string }): AxiosInstanceFactory {
    this.#headers = { ...this.#headers, ...headers };
    return this;
  }

  setParams(params: { [name: string]: string }): AxiosInstanceFactory {
    this.#params = { ...this.#params, ...params };
    return this;
  }

  build(): Instance {
    if (this.#baseUrl.length === 0) {
      throw new Error("[AxiosInstanceFactory] URL cannot be empty");
    }
    const config: RequestConfig = {
      baseURL: this.#baseUrl,
      timeout: this.#timeout,
      headers: this.#headers,
      params: this.#params,
    };
    return axios.create(config);
  }
}
