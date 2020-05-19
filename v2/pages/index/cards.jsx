import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { Card } from '../../components/UI';

const Cards = () => {
  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities').limit(3));
  return (
    <div className="card-group">
      {value &&
        value.docs.map((doc) => {
          const { title, description } = doc.data();
          return (
            !loading && (
              <Card
                key={doc.id}
                title={title}
                description={description}
                image="https://i.picsum.photos/id/757/300/200.jpg"
              />
            )
          );
        })}
      <style jsx>
        {`
          .card-group {
            display: flex;
            padding: 1rem;
            max-width: 100rem;
          }
        `}
      </style>
    </div>
  );
};

export default Cards;
