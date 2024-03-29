/* eslint-disable import/no-unresolved */
import React from 'react';
import Head from 'next/head';
import Popular from '../components/Popular';
import Banner from '../components/Banner';
import Vegetarian from '../components/Vegetarian';
import Keto from '../components/Keto';
import GlutenFree from '../components/GlutenFree';
import Pescetarian from '../components/Pescetarian';
import Vegan from '../components/Vegan';
import Paleo from '../components/Paleo';
import Footer from '../components/Footer';
import BackTop from '../components/BackTop';
import '@splidejs/react-splide/css';
import '@splidejs/splide/css';

export default function Home() {
  return (
    <div className="bg-fixed bg-center bg-no-repeat bg-cover bg-orange">
      <Head>
        <title>Recipe Corner</title>
        <meta
          name="description"
          content="Recipe Corner - Recipes and nutrutional information - Rita Guilherme Web Engineer Portfolio"
          key="desc"
        />
      </Head>

      <main>
        <Banner />
        <section className="mt-[10%]  px-5  bg-white ">
          <Popular />
          <Vegetarian />
          <Keto />
          <GlutenFree />
          <Pescetarian />
          <Vegan />
          <Paleo />
        </section>
        <BackTop />
        <Footer />
      </main>
    </div>
  );
}

// drop shaddow on same colour text
// drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.8)]
