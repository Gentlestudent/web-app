import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const { id } = router.query;
  return <p>{id}</p>;
};
