type CookieStoreLike = {
  get(name: string): { value?: string } | undefined;
};

export const CONTRACTOR_AUTH_COOKIE = "mc_contractors_auth";

export function getContractorPassword() {
  return process.env.CONTRACTOR_PORTAL_PASSWORD || "EpoxyFlooring";
}

export function isContractorAuthorizedCookie(value?: string) {
  return value === "1";
}

export function isContractorAuthorized(store: CookieStoreLike) {
  return isContractorAuthorizedCookie(store.get(CONTRACTOR_AUTH_COOKIE)?.value);
}
