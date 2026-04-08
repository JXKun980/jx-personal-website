/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  CONTENT: KVNamespace;
}

declare namespace App {
  interface Locals extends Runtime {}
}
