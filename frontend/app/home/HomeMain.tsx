import { HomeLogin } from './HomeLogin';

export function HomeMain() {
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
