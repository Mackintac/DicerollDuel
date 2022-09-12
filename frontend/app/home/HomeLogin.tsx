import axios from 'axios';

const epPort = 'http://localhost:7890';

axios.defaults.withCredentials = true;

export function HomeLogin() {
  return (
    <>
      <div className='home__LoginForm'>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await axios.post(epPort + '/login', {
              username: 'smackgr',
              password: 'smackpass',
            });
          }}
        >
          <button type='submit'>Login</button>
        </form>
        <button type='submit'>Logout</button>
        <button type='submit'>checklogin</button>
        <button type='submit'>checkgame</button>
        <button type='submit'>joingame</button>
        <button type='submit'>leavegame</button>
      </div>
    </>
  );
}
