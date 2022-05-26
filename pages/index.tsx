import type { NextPage } from "next";
import Link from "next/link";

import { useUser, login, logout } from "../lib/auth";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  const user = useUser();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <>
      <Header />
      <h1>Todoアプリです</h1>
      <p>
        <Link href="/todos">Todo Listはこちら</Link>
      </p>
      <div>
        {user !== null ? (
          <>
            <h2>ログインしている</h2>
            <button onClick={handleLogout}>ログアウト</button>
          </>
        ) : (
          <>
            <h2>ログインしていない</h2>
            <button onClick={handleLogin}>ログイン</button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
