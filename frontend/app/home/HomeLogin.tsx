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

            const resLogin = await axios.post(epPort + '/login', {
              username: 'smackgr',
              password: 'smackpass',
            });
            console.log(resLogin.data.message);
          }}
        >
          <button type='submit'>Login</button>
        </form>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const resLogout = await axios.delete(epPort + '/login');

            console.log(resLogout.data.status);
          }}
        >
          <button type='submit'>Logout</button>
        </form>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const loginStatus = await axios.get(epPort + '/login');
            console.log(loginStatus.data.status);
          }}
        >
          <button type='submit'>checklogin</button>
        </form>

        <button type='submit'>checkgame</button>
        <button type='submit'>joingame</button>
        <button type='submit'>leavegame</button>
      </div>
    </>
  );
}
