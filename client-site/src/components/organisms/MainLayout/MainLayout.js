import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Navbar from '../Navbar/Navbar';

const MainLayout = ({ children }) => {
  const { Footer } = Layout;
  return (
    <>
      <Head>
        <title>IWKZ E-Commerce</title>
        <meta name="description" content="Saso Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        {children}
        <Footer
          style={{
            backgroundColor: 'rgb(140, 211, 122)',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          © 2023 IWKZ Al-Falah
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
