import type { NextPage } from "next";
import Link from "next/link";

import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1>Todo Listページ</h1>
      <Link href="/todos">
        <a>Todo Listはこちら</a>
      </Link>
    </>
  );
};

export default Home;
