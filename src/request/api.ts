import service from ".";
import type { LoginData } from "@/types/login";

export function login(data: LoginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}
export function getGoodsList() {
  return service({
    url: "/getGoodsList",
    method: "GET",
  });
}
export function getUserList() {
  return service({
    url: "/getUserList",
    method: "GET",
  });
}
export function getRoleList() {
  return service({
    url: "/getRoleList",
    method: "GET",
  });
}
export function getAuthorityList() {
  return service({
    url: "/getAuthorityList",
    method: "GET",
  });
}
