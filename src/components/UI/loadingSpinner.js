import Icon from './icon';

const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner-root">
        <div>
          <Icon name="spinner" />
        </div>
      </div>

      <style jsx>
        {`
          .spinner-root {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .spinner-root > div {
            animation: 2s linear infinite rotate;
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default LoadingSpinner;
