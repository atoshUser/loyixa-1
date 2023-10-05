import Image from "next/image";

import Head from "next/head";
import { Header, Hero } from "@/components";
import { GetServerSideProps } from "next";
import { IMovie } from "@/interface/movie.app";
import { API_REQUEST } from "@/service/service.app";

export default function Home({ trending_data_day }: IServerProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="This application help to you watching new movies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/site-logo.svg" type="image/x-icon" />
      </Head>
      <Header />
      <Hero movie={trending_data_day} />
      <main className="flex flex-col">
       
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  IServerProps
> = async () => {
  const trending_all_day_data = await fetch(API_REQUEST.trending_day_data).then(
    (res) => res.json()
  );

  return {
    props: {
      trending_data_day: trending_all_day_data.results,
    },
  };
};

export interface IServerProps {
  trending_data_day: IMovie[];
}
