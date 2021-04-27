import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { handleVerifyEmail } from '../../api/auth';
import fetchStatusReducer from '../../reducers/fetchStatusReducer';

const Action = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, {});

  useEffect(() => {
    const handleAction = async () => {
      const { mode, oobCode } = router.query;

      dispatch(['INIT']);
      try {
        if (mode === 'verifyEmail') {
          await handleVerifyEmail(oobCode);
          dispatch(['COMPLETE']);
        }
      } catch (error) {
        dispatch(['ERROR', { code: `${mode.toLowerCase()}-fail` }]);
      }
    };
    handleAction();
  }, [router]);

  return <></>;
};

export default Action;
