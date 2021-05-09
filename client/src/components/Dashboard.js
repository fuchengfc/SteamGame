import React from "react";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import DashboardGameRow from "./DashboardGameRow";
import Search from "./Search";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      //genres: [],
      games: [],
    };
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/gameTop10", {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => {
          // Convert the response data to a JSON.
          return res.json();
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      )
      .then(
        (result) => {
          const { data = [] } = result;
          if (!data) return;
          // Map each genreObj in genreList to an HTML element:
          // A button which triggers the showMovies function for each genre.
          let gameitems = data.map((genreObj, i) => (
            <DashboardGameRow
              key={i}
              {...genreObj}
            />
          ));

          // Set the state of the genres list to the value returned by the HTTP response from the server.
          this.setState({
            games: gameitems,
          });
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  search(args) {
    let params = Object.keys(args)
      .map((key) => `${key}=${args[key]}`)
      .join("&");

    fetch("http://localhost:8081/search?" + params, {
      method: "GET", // The type of HTTP request.
    })
      .then(
        (res) => res.json(),
        (err) => {
          console.log(err);
        }
      )
      .then(
        (result) => {
          const { data = [] } = result;
          if (!data) return;

          console.log(data);
          const tmpData = {
            genre: "",
            list: data,
          };

          const gameitems = [<DashboardGameRow showGenre {...tmpData} />];
        
          this.setState({
            games: gameitems,
          });
        },
        (err) => {
          // Print the error if there is one.
          console.log(err);
        }
      );
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="dashboard" />
        <div className="container movies-container">
          <div className="jumbotron">
            <Search onSearch={this.search.bind(this)} onReset={this.componentDidMount.bind(this)}/>
            <div className="movies-container">
              <div className="game-body1" id="results">
                {this.state.games}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
