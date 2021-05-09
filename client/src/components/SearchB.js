import React from "react";
import "../style/Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ""
    };
  }

 

  changeValue(field, event) {
    const { value } = event.target;
    this.state[field] = value;

    this.props[field] && this.props[field](this.state);
  }

  render() {
    return (
        <div className="searchCss" style={{position: "relative"}}>
            <div className="row align-center">
              Search Tags: 
                <input
                    type="search" className="form-control margin-left-10" 
                    placeholder="Search tags"
                    onChange={this.changeValue.bind(this, "tags")}
                />
            </div>
            {/* <div className="row" style={{ position: "absolute", right: 0, top: 0 }}>
            <button onClick={this.conditionSearch.bind(this)}>Search</button>
            <button onClick={this.reset.bind(this)}>Reset</button>
            </div> */}
            <div>
        </div>
      </div>
    );
  }
}
