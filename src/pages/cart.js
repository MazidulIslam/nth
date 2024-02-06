import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function cart() {
  const country = {
    name: 'Bangladesh',
    code: 'BD',
    flag: 'https://www.seekpng.com/png/full/270-2704243_quality-hd-good-photos-of-bangladesh-flag-bangladesh.png',
  };
  return (
    <div>
      <Header country={country} />
      cart
      <Footer country={country} />
    </div>
  );
}
