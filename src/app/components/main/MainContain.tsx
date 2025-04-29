import React from 'react';
import {Hero} from './Hero';
import {MainFeature} from './MainFeature';
import {Cta} from './Cta';

export const MainContain = () => {
  return (
    <>
      <main>
        {/* 배너 */}
        <Hero />
        <div className="mt-12">
          {/* 특징 */}
          <MainFeature />
        </div>
        {/* 사용자 행동 유도 */}
        <Cta />
      </main>
    </>
  );
};
