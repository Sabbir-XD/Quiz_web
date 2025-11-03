"use client";

import axios from "axios";

import { usePaths } from "src/routes/paths";

import { CONFIG_STATIC } from "src/config-global";

export function useAxios() {
  const paths = usePaths();

  const instance = axios.create({
    baseURL: `${CONFIG_STATIC.serverUrl}/${paths.locale}`,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) =>
      Promise.reject(
        (error.response && error.response.data) || "Something went wrong!"
      )
  );

  return instance;
}
