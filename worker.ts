interface StaticAssetBinding {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface Environment {
  ASSETS: StaticAssetBinding;
}

export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
