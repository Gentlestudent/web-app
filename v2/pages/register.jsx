import { useContext } from 'react';
import Head from 'next/head';
import AuthContext from '@/context/auth';
import { Button, Input } from '@/components/UI';
import { auth } from '@/api/auth';

const Register = () => {
  const { isUserSignedIn } = useContext(AuthContext);

  const doRegister = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Registreer | Gentlestudent</title>
      </Head>
      <form onSubmit={doRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <Input type="email" id="email" placeholder="Email" icon="envelope" />
        </div>

        <div>
          <label htmlFor="first-name">Voornaam:</label>
          <Input type="text" id="first-name" placeholder="Voornaam" icon="user" />
          <label htmlFor="last-name">Achternaam:</label>
          <Input type="text" id="last-name" placeholder="Achternaam" icon="user" />
        </div>

        <div>
          <label htmlFor="organisation">Organisatie/onderwijsinstelling:</label>
          <Input
            type="text"
            id="organisation"
            placeholder="Organisatie/onderwijsinstelling"
            icon="building"
          />
        </div>

        <div>
          <label htmlFor="password">Wachtwoord:</label>
          <Input type="password" id="password" placeholder="Wachtwoord" icon="lock" />
          <label htmlFor="password-repeat">Herhaal wachtwoord:</label>
          <Input
            type="password"
            id="password-repeat"
            placeholder="Herhaal wachtwoord"
            icon="lock"
          />
        </div>

        <Button type="submit">Registreer</Button>
        <style jsx>
          {`
            form {
              width: 50rem;
            }
            div {
              margin-bottom: 5rem;
            }

            div > :global(div) {
              margin-bottom: 1rem;
            }

            div :global(input) {
              font-weight: bold;
            }
          `}
        </style>
      </form>
    </>
  );
};

export default Register;
