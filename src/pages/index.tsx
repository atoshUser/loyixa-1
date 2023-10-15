import Image from "next/image";

import Head from "next/head";
import { Header, Hero, MovieModal, Row, SubscriptionPlan } from "@/components";
import { GetServerSideProps } from "next";
import { IMovie, IProduct } from "@/interface/movie.app";
import { API_REQUEST } from "@/service/service.app";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { UseMovieStore } from "@/store";

export default function Home({
  trending_data_day,
  trending_all,
  top_rated,
  tv_series,
  tv_rated,
  product,
}: IServerProps) {
  const { isLoading } = useContext(AuthContext);
  const { modal } = UseMovieStore();

  if (isLoading) {
    return null;
  }

  const subscriptionPlan = false;
  if (!subscriptionPlan) return <SubscriptionPlan products={product} />;
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
      <main className="relative w-full h-full ">
        <div className="flex flex-col">
          <Row
            title="Trending"
            movie={trending_all}
            isBig={true}
            isFirst={true}
          />

          <Row
            title="Top Rated"
            movie={top_rated}
            isBig={false}
            isFirst={false}
          />

          <Row
            movie={tv_series}
            isFirst={false}
            isBig={true}
            title="TV series"
          />
          <Row
            movie={tv_rated}
            isFirst={false}
            isBig={false}
            title="Cartoons"
          />
          {modal && <MovieModal />}
          <div className="h-[150px] bg-red-700"></div>
          <div className="h-[150px] bg-slate-500"></div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  IServerProps
> = async () => {
  const [
    trending_all_day_data,
    trending_all_data,
    top_rated_data,
    tv_series_data,
    tv_rated_data,
    products,
  ] = await Promise.all([
    fetch(API_REQUEST.trending_day_data).then((res) => res.json()),
    fetch(API_REQUEST.trending_all).then((res) => res.json()),
    fetch(API_REQUEST.top_rated).then((res) => res.json()),
    fetch(API_REQUEST.tv_series).then((res) => res.json()),
    fetch(API_REQUEST.tv_rated).then((res) => res.json()),
    fetch(API_REQUEST.product).then((res) => res.json()),
  ]);
  return {
    props: {
      trending_data_day: trending_all_day_data.results,
      trending_all: trending_all_data.results,
      top_rated: top_rated_data.results,
      tv_series: tv_series_data.results,
      tv_rated: tv_rated_data.results,
      product: products.products.data,
    },
  };
};

export interface IServerProps {
  trending_data_day: IMovie[];
  trending_all: IMovie[];
  top_rated: IMovie[];
  tv_series: IMovie[];
  tv_rated: IMovie[];
  product: IProduct[];
}
