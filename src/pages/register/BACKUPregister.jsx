import Head from 'next/head';
import { useInput, useAuth } from '../../hooks';
import Layout from '../../components/layout';
import { Button, Input } from '../../components/UI';
import { registerWithEmailPassword } from '../../api/auth';

const Register = () => {
  const { isUserSignedIn } = useAuth();

  const { value: email, bind: bindEmail } = useInput('');
  const { value: firstName, bind: bindFirstName } = useInput('');
  const { value: lastName, bind: bindLastName } = useInput('');
  const { value: organisation, bind: bindOrganisation } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: repeatPassword, bind: bindRepeatPassword } = useInput('');

  const doRegister = (e) => {
    e.preventDefault();

    registerWithEmailPassword(email, password, firstName, lastName)
      .then(async (user) => {
        console.log(user);
      })
      .catch((error) => {
        // TODO handle error
      });
  };

  return (
    <Layout>
      <Head>
        <title>Registreer | Gentlestudent</title>
      </Head>
      <form onSubmit={doRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <Input type="email" id="email" placeholder="Email" icon="envelope" {...bindEmail} />
        </div>

        <div>
          <label htmlFor="first-name">Voornaam:</label>
          <Input
            type="text"
            id="first-name"
            placeholder="Voornaam"
            icon="user"
            {...bindFirstName}
          />
          <label htmlFor="last-name">Achternaam:</label>
          <Input
            type="text"
            id="last-name"
            placeholder="Achternaam"
            icon="user"
            {...bindLastName}
          />
        </div>

        <div>
          <label htmlFor="organisation">Organisatie/onderwijsinstelling:</label>
          <Input
            type="text"
            id="organisation"
            placeholder="Organisatie/onderwijsinstelling"
            icon="building"
            {...bindOrganisation}
          />
        </div>

        <div>
          <label htmlFor="password">Wachtwoord:</label>
          <Input
            type="password"
            id="password"
            placeholder="Wachtwoord"
            icon="lock"
            {...bindPassword}
          />
          <label htmlFor="password-repeat">Herhaal wachtwoord:</label>
          <Input
            type="password"
            id="password-repeat"
            placeholder="Herhaal wachtwoord"
            icon="lock"
            {...bindRepeatPassword}
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
    </Layout>
  );
};

export default Register;
