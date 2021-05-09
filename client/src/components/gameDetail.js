import React from "react";
import "../style/Dashboard.css";
import PageNavbar from "./PageNavbar";
import Search from "./Search";

export default class GameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {detail: {}};
  }

  componentDidMount() {
    const params = this.parseUrlParams();
    console.log(params);
    const { appid } = params;
    fetch("http://localhost:8081/gameDetail/" + appid, {
      method: "GET",
    })
      .then(
        (res) => {
          return res.json(); //return json data
        },
        (err) => {
          console.log(err);
        }
      )
      .then(
        (result) => {
          const { data } = result;
          if (!data) return;
          const detail = Object.assign({ ...params }, { ...data }); //combine url and json data
          this.setState({ detail }); 
          // console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // get detailed game info from url
  parseUrlParams() {
    const [a, query] = window.location.href.split("?");
    const obj = {};
    if (!query) {
      return obj;
    }
    query.split("&").forEach((kv) => {
      const [key, value] = kv.split("=");
      obj[key] = decodeURIComponent( value);
    });
    // console.log(obj);
    return obj;
  }

  render() {
    const detail = this.state.detail || {};

    const {positive_ratings=0,negative_ratings=0} = detail;
    const total = Number(positive_ratings) + Number(negative_ratings);
    console.log(total,detail);
  
    return (
      <div className="Dashboard">
        {/* <PageNavbar active="dashboard" /> */}
        <div className="container movies-container">
          <div className="jumbotron"
          style={{ backgroundImage: `url('${detail.background}')` }}>
            <div className="movies-container">
              <div className="row ">
                <div className="col-10"></div>
                <div
                  className="col-2 hand color-white"
                  onClick={() => window.history.back()}
                >
                  Back
                </div>
              </div>
              <div className="game-body2">
                <div className="left-image" style={{width:'40%'}}>
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url('${detail.header_image}')`,backgroundSize:'contain' }}
                  ></div>
                </div>
                <div className="margin-left-10">
                  <div className="margin-top-20">Name: {detail.name}</div>
                  <div className="margin-top-20">Genre: {detail.genre}</div>
                  <div className="margin-top-20">Positive Rating: {detail.positive_ratings}/{total}</div>
                  <div className="margin-top-20">
                    Website: 
                    <a href={detail.website} target="_blank">
                      {detail.website || ""}
                    </a>
                  </div>
                </div> 
              </div>
              <div className="game-body3">
                <div>
                  <h3>About:</h3>
                </div>
                {/* {detail.about_the_game} */}
                <div
                  dangerouslySetInnerHTML={{ __html: detail.about_the_game }}
                ></div>
              </div>

              {/* <div className="game-body3">
                <div>
                  <h3>ScreenShots:</h3>
                </div>
              </div>
              <div
                style={{ backgroundImage: `url('${detail.screenshots}')` }}
              ></div> */}

              {/* <div className="margin-top-10">
                <div>
                  <h3>Description:</h3>
                </div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: detail.detailed_description,
                  }}
                ></span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
