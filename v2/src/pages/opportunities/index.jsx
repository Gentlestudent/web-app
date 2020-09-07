import Router from 'next/router';
import Link from 'next/link';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { routes } from '../../constants';

export default () => {
  /*
   * TODO: Only fetch opportunities of specific issuer
   */

  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities'));
  return (
    <>
      <Link href={routes.issuer.CREATE_OPPORTUNITY}>Create new opportunity</Link>
      {value &&
        value.docs.map((doc) => {
          const { title } = doc.data();
          const { id } = doc;
          return (
            !loading && (
              <div
                key={id}
                onClick={() =>
                  Router.push(routes.issuer.OPPORTUNITY, `${routes.issuer.OPPORTUNITIES}/${id}`)
                }
              >
                {title}
              </div>
            )
          );
        })}
    </>
  );
};
