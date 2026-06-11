import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";

type Props = {
  csrfToken: string;
};

export default function Login({ csrfToken }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main style={{ maxWidth: 500, margin: "4rem auto", padding: "1rem" }}>
      <h1>Login</h1>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Masuk</button>
      </form>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}