/* eslint-disable @typescript-eslint/consistent-type-definitions */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BACKEND_HOST: string
  VITE_ENABLE_LIGHT_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
