import Router from 'next/router';
import Link from 'next/link';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { routes } from '../../constants';

const Opportunities = () => {
  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities').limit(3));
  return (
    <>
      {!loading &&
        value &&
        value.docs.map((doc) => {
          const { title, description } = doc.data();
          const { id } = doc;
          return (
            !loading && (
              <div
                key={id}
                onClick={() => Router.push(routes.opportunity, `${routes.opportunities}/${id}`)}
              >
                {title}
              </div>
            )
          );
        })}
    </>
  );
};

export default Opportunities;
