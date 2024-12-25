function CollectionsFooter({ pokemonTotal, itemPerPage, page, setPage }) {
 const totalPage = Math.ceil(pokemonTotal / itemPerPage);

 if (totalPage <= 1) {
  return null;
 }

 return (
  <footer className="collections-bottom">
   <div className="arrow-button">
    {page > 1 && (
     <button className="prev-button" onClick={() => setPage(page - 1)}>
      <i className="fas fa-chevron-left"></i>
     </button>
    )}
    {page < totalPage && (
     <button className="next-button" onClick={() => setPage(page + 1)}>
      <i className="fas fa-chevron-right"></i>
     </button>
    )}
   </div>
   <div className="page-number-wrapper">
    {page !== 1 && <button onClick={() => setPage(1)}>1</button>}

    {page > 3 && <button onClick={() => setPage(page - 2)}>...</button>}

    {totalPage > 3 && page === totalPage && (
     <button onClick={() => setPage(page - 2)}>{page - 2}</button>
    )}

    {page > 2 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}

    <button className="active">{page}</button>

    {page < totalPage - 1 && (
     <button onClick={() => setPage(page + 1)}>{page + 1}</button>
    )}

    {totalPage > 3 && page === 1 && (
     <button onClick={() => setPage(page + 2)}>{page + 2}</button>
    )}

    {page < totalPage - 2 && (
     <button onClick={() => setPage(page + 2)}>...</button>
    )}

    {page !== totalPage && (
     <button onClick={() => setPage(totalPage)}>{totalPage}</button>
    )}
   </div>
  </footer>
 );
}

export default CollectionsFooter;
