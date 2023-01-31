
const Filter = (props) => {
    return (
      <div className="filterDiv" onClick={() => props.toggleFilter(props.value)}>
          {props.language}
      </div>
    );
  };
  
  export default Filter;