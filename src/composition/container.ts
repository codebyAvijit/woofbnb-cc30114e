/**
 * Composition root.
 *
 * Wires Infrastructure implementations to Application contracts. This is the
 * only module allowed to import concrete Infrastructure classes; Presentation
 * consumes the exported interfaces through React context.
 */

import type { IAuthService } from "@/application/_shared/services/IAuthService";
import { RestAuthService } from "@/infrastructure/_shared/auth/RestAuthService";
import { LocalTokenStorage } from "@/infrastructure/_shared/auth/TokenStorage";
import { createHttpClient } from "@/infrastructure/_shared/http/HttpClient";

export interface AppServices {
  readonly authService: IAuthService;
}

function buildServices(): AppServices {
  const tokenStorage = new LocalTokenStorage();

  let authService: RestAuthService | null = null;

  const httpClient = createHttpClient({
    getAccessToken: () => tokenStorage.read()?.accessToken ?? null,
    onUnauthorized: () => {
      // Keep the presentation layer in sync when credentials are rejected.
      if (authService) authService.handleUnauthorized();
      else tokenStorage.clear();
    },
  });

  authService = new RestAuthService(httpClient, tokenStorage);

  return { authService };
}

let services: AppServices | null = null;

/** Returns the shared service container, creating it on first use. */
export function getServices(): AppServices {
  services ??= buildServices();
  return services;
}
