import React from "react";
import "../style/Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_name: "",
      releaseDateList: [],
      ratingList: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],

      condition: {
        game_name: "",
        price_begin: 0,
        price_end: 1000,
        release_date: "",
        genre: "",
        rating: "",
      },
    };
  }

  componentDidMount() {
    const list = [];
    const start = 1997;
    for (let i = 0; i < 23; i += 1) {
      list.push(start + i);
    }
    this.setState({ releaseDateList: list });
  }

  changeValue(field, event) {
    const { value } = event.target;
    console.log(field, value);
    const temp = {...this.state.condition};
    temp[field] = value;
    //refresh
    this.setState({
      condition: {...temp},
    });
  }

  reset() {
    this.setState({
      condition: {
        game_name:"",
        price_begin: 0,
        price_end: 10000,
        release_date: "",
        genre: "",
        rating: "",
      },
    });
    const { onReset } = this.props;
    if (onReset) {
      onReset();
    }
  }

  conditionSearch() {
    console.log(this.state.condition);
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch({ ...this.state.condition });
    }
  }

  render() {
    const { ratingList, releaseDateList } = this.state;
    return (
      <div className="searchCss">
        <div className="row align-center">
          <div className="col-1"></div>
          <div className="label label-1">Name:</div>
          <input
            className="form-control"
            type="search"
            placeholder="Search game"
            onChange={this.changeValue.bind(this, "game_name")}
            value = {this.state.condition.game_name}
          />
          <div className="label">Price from:</div>
          <input
            type="number"
            min="0"
            className=" price form-control"
            placeholder="from"
            value = {this.state.condition.price_begin}
            onChange={this.changeValue.bind(this, "price_begin")}
          />
          <div
            id="price_to"
            className="label label-1"
            style={{ marginLeft: "5px" }}
          >
            Price to:
          </div>
          <input
            type="number"
            max="1000"
            className="form-control price"
            placeholder="to"
            value = {this.state.condition.price_end}
            onChange={this.changeValue.bind(this, "price_end")}
          />
          <div className="col-1"></div>
          {/* <button onClick={this.search.bind(this)}>Search</button> */}
        </div>
        <div className="row margin-top-10 align-center">
          <div className="col-1"></div>
          <div className="label label-1">Genre:</div>
          <div>
            <select className="form-control" value = {this.state.condition.genre} onChange={this.changeValue.bind(this, "genre")}>
              <option value="">Select</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
              <option value="Racing">Racing</option>
              <option value="Casula">Casula</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="label ">Release date:</div>
          <div>
            <select className="form-control" value = {this.state.condition.release_date} onChange={this.changeValue.bind(this, "release_date")}>
              <option value="">Select</option>
              {releaseDateList &&
                releaseDateList.map((row, index) => {
                  return (
                    /*不写key会报错*/
                    <option value={row} key={index}>
                      {row}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="label label-1" style={{ marginLeft: "5px" }}>
            Rating:
          </div>
          <div>
            <select className="form-control" value = {this.state.condition.rating} onChange={this.changeValue.bind(this, "rating")}>
              <option value="">Select</option>
              {ratingList &&
                ratingList.map((row, index) => {
                  return (
                    <option value={row} key={index}>
                      {row}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row margin-top-10">
          <div className="col-3"></div>
          <div className="col-3  text-center">
            
            <button
              className="btn btn-primary"
              onClick={this.conditionSearch.bind(this)}
            >
              Search
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="btn btn-secondary"
              onClick={this.reset.bind(this)}
            >
              Reset
            </button>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}
