import Router from 'next/router';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { routes } from '../../constants';

export default () => {
  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities'));
  return (
    <>
      {value &&
        value.docs.map((doc) => {
          const { title, description } = doc.data();
          const { id } = doc;
          return (
            !loading && (
              <div
                key={id}
                onClick={() => Router.push(routes.OPPORTUNITY, `${routes.OPPORTUNITIES}/${id}`)}
              >
                {title}
              </div>
            )
          );
        })}
    </>
  );
};
