import { colors } from '../../assets/styles';

const Pagination = ({ page, minPage = 1, maxPage, setPage }) => {
  function handleChange(pageNumber) {
    return () => {
      pageNumber = Math.max(pageNumber, 1);
      pageNumber = maxPage ? Math.min(pageNumber, maxPage) : pageNumber;
      if (pageNumber !== page) {
        setPage(pageNumber);
      }
    }
  }

  function handleInputChange(event) {
    handleChange(Number(event.target.value) || minPage)();
  }

  return (
    <>
      <div className="root">
        <span>Pagina</span>
        <button onClick={handleChange(page - 1)}>&lt;</button>
        <input type="number" value={page} onChange={handleInputChange} />
        <button onClick={handleChange(page + 1)}>&gt;</button>
      </div>

      <style jsx>
        {`
          .root {
            display: flex;
          }

          .root > span {
            align-self: center;
            margin-right: 0.5rem;
          }

          .root button {
            cursor: pointer;
            background-color: transparent;
            padding: 10px 8px;
            border: none;
            border: 1px solid ${colors.border};
            border-radius: 0.5rem;
          }

          .root button:hover {
            background-color: ${colors.blueLight};
          }

          .root button:first-of-type {
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .root button:last-of-type {
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          .root input {
            width: 70px;
            border-radius: 0;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default Pagination;
