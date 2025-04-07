import React from 'react';
import {Hero} from './Hero';
import {MainFeature} from './MainFeature';
import {Cta} from './Cta';

export const MainContain = () => {
  return (
    <>
      <main>
        <Hero />
        <div className="mt-12">
          <MainFeature />
        </div>
        <Cta />
      </main>
    </>
  );
};
