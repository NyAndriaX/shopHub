
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/app/[locale]/utils";

export async function GET(): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const idToken = await getIdToken();
    const endSessionUrl = process.env.END_SESSION_URL;
    const redirectUrl = process.env.NEXTAUTH_URL;

    if (!endSessionUrl || !redirectUrl) {
      console.error(
        "END_SESSION_URL or NEXTAUTH_URL is missing in environment variables."
      );
      return new Response(
        JSON.stringify({ message: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const url = `${endSessionUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUrl}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      console.error(
        `Failed to log out on Keycloak. Status: ${response.status}, Body: ${await response.text()}`
      );
      return new Response(
        JSON.stringify({ message: "Logout failed on Keycloak" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Unexpected error during logout:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
