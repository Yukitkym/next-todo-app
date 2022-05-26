import type { NextPage } from "next";
import Link from "next/link";

import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1>Todoアプリです</h1>
      <p>
        <Link href="/todos">Todo Listはこちら</Link>
      </p>
    </>
  );
};

export default Home;
