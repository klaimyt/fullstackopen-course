const Search = ({ seachHandler }) => {
  return (
    <div>
      find countries <input onChange={seachHandler} />
    </div>
  );
};

export default Search;
