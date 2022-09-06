import { HomeLogin } from './HomeLogin';

export function Home() {
  return (
    <>
      <div className='home'>
        <div className='home__panel'>
          <HomeLogin />
        </div>
      </div>
    </>
  );
}
