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
      <h1>Todoアプリ</h1>

      <div>
        {user !== null ? (
          <>
            <p>現在、ログインをしています</p>
            <h2>
              <Link href="/todos">Todo Listへ飛ぶ</Link>
            </h2>
            <button onClick={handleLogout}>ログアウト</button>
          </>
        ) : (
          <>
            <h2>ログインをしてください</h2>
            <button onClick={handleLogin}>ログイン</button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
