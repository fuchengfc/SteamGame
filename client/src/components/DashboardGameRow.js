import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class DashboardGameRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { seeAll: false };
  }

  render() {
    const { genre, list: items = [], showGenre } = this.props;
    const { seeAll } = this.state;

    //show 4 games by default in main page, and show 10 games by default in search page
    const arrayLength = showGenre ? 10 : 4;

    //if seeAll, show 10 games
    const list = seeAll ? items : items.slice(0, arrayLength);

    return (
      <div>
        <div className="row">
          <div className="col-10 font-size-20 hand font-bold">{genre}</div>
          <div
            className="col-2 hand"
            onClick={() => this.setState({ seeAll: !seeAll })}
          >
            {seeAll ? "Collaps" : "See More"}{" "}
          </div>
        </div>
        <div className="row">
          {list &&
            list.length > 0 &&
            list.map((game) => {
              const {
                appid,
                name,
                positive_ratings,
                header_image,
                rating,
                negative_ratings,
              } = game;
              const url = `/gameDetail?appid=${appid}&name=${name}&genre=${game.genres||genre}&positive_ratings=${positive_ratings}&headimage=${encodeURIComponent(
                header_image
              )}&rating=${rating}&negative_ratings=${negative_ratings}`;
              //console.log(url);
              return (
                <div className="game-item" key={game.appid}>
                  <a href={url}>
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${header_image})` }}
                    ></div>
                  </a>
                  <div className="game-right">
                    <div className="title margin-top-10">
                      <a href={url}>{name}</a>
                    </div>
                    <div className="votes margin-top-20">Rating: {rating}</div>
                    {showGenre && (
                      <div className="showGenre">{game.genres}</div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
