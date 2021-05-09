import React from "react";
import "../style/Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_name: "",
      requirements: ""
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
              Name: 
                <input
                    type="search" className="form-control margin-left-10" 
                    placeholder="Search game"
                    onChange={this.changeValue.bind(this, "game_name")}
                />
                <div className="margin-left-10">

                    Requirements:
                </div>
                <div className="margin-left-10">
                    <select className="form-control" onChange={this.changeValue.bind(this, "requirements")}>
                    <option value="">Select</option>
                    <option value="mac_requirements">Mac</option>
                    <option value="pc_requirements">Pc</option>
                    <option value="linux_requirements">Linux</option>
                    </select>
            </div>
            
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
