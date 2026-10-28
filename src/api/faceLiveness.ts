import {API_URL} from "@/helper/constant";

export type LivenessCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: Date;
  region: string;
};

export class FaceLivenessApiError extends Error {}

/** Short-lived AWS credentials scoped to one liveness session. */
export async function fetchLivenessCredentials(
  sessionId: string,
): Promise<LivenessCredentials> {
  const res = await fetch(`${API_URL}/api/web/face-liveness/credentials`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({sessionId}),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new FaceLivenessApiError(
      data?.message ?? "Couldn't start the face scan. Please try again.",
    );
  }

  return {
    accessKeyId: data.accessKeyId,
    secretAccessKey: data.secretAccessKey,
    sessionToken: data.sessionToken,
    expiration: new Date(data.expiration),
    region: data.region,
  };
}
