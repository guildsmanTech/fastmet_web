import {API_URL} from "@/helper/constant";

export type WebDeletionAccountType = "client" | "driver";

export type WebDeletionAccountStatus = {
  type: WebDeletionAccountType;
  deletionStatus: "active" | "pending_deletion" | "deleted";
  deletionScheduledAt: string | null;
  canDelete: boolean;
  reason?: string;
  message?: string;
};

export async function sendDeletionOtp(phoneNumber: string) {
  const res = await fetch(`${API_URL}/api/auth/send-otp-account-deletion`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phoneNumber}),
  });
  const data = await res.json();
  return {ok: res.ok, status: res.status, data};
}

export async function verifyDeletionOtp(phoneNumber: string, otpCode: string) {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phoneNumber, otpCode}),
  });
  const data = await res.json();
  return {ok: res.ok, status: res.status, data};
}

export async function fetchDeletionStatus(verifyToken: string) {
  const res = await fetch(`${API_URL}/api/account-deletion/status`, {
    headers: {Authorization: `Bearer ${verifyToken}`},
  });
  const data = await res.json();
  return {ok: res.ok, status: res.status, data};
}

export async function requestWebDeletion(
  verifyToken: string,
  accountType: WebDeletionAccountType,
) {
  const res = await fetch(`${API_URL}/api/account-deletion/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${verifyToken}`,
    },
    body: JSON.stringify({accountType}),
  });
  const data = await res.json();
  return {ok: res.ok, status: res.status, data};
}

export async function cancelWebDeletion(
  verifyToken: string,
  accountType: WebDeletionAccountType,
) {
  const res = await fetch(`${API_URL}/api/account-deletion/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${verifyToken}`,
    },
    body: JSON.stringify({accountType}),
  });
  const data = await res.json();
  return {ok: res.ok, status: res.status, data};
}
