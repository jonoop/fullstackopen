const Form = ({
    newName,
    newNumber,
    onChange,
    onChangeNumber,
    addNewName,
    searchValue,
    onChangeSearch,
  }) => {
    return (
      <div>
        <div id="search-container">
          Filter:{' '}
          <input
            id="search"
            type="search"
            value={searchValue}
            onChange={onChangeSearch}
          />
        </div>
        <h2>Add new</h2>
        <form onSubmit={addNewName}>
          <div className="input-container">
            Name: <input value={newName} onChange={onChange} />
          </div>
          <div className="input-container">
            Number:{' '}
            <input
              value={newNumber}
              onChange={onChangeNumber}
              placeholder="example formats: 02-345679 or 123-45678"
            />
          </div>
          <div id="submit-container">
            <button id="submit" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Form;