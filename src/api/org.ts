import http from "@/api/http";

// Organization:列表
export const organizations = () => {
  return http.get(`/api/organization/v1/organizations`);
};
