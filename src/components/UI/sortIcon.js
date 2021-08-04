const SortIcon = ({ sort, name }) => {
  const classNames = [];

  if (sort === name) {
    classNames.push('sorted', 'reversed');
  }

  if (sort === `-${name}`) {
    classNames.push('sorted');
  }

  return (
    <>
      <div className={classNames.join(' ')}></div>

      <style jsx>
        {`
          .sorted {
            position: relative;
            width: 20px;
            height: 1px;
            display: inline;
          }

          .sorted::after {
            content: '^';
          }

          .reversed::after {
            position: absolute;
            transform: scaleY(-1);
          }
        `}
      </style>
    </>
  );
};

export default SortIcon;
