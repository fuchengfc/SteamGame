import React from "react";
import "../style/Dashboard.css";
import PageNavbar from "./PageNavbar";
import Search from "./SearchA";

export default class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            requirements: "",
            game_name: ""
        };
    }

    componentDidMount() {
        let { game_name } = this.state;

        fetch(`http://localhost:8081/requirements?game_name=${game_name}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(
            (result) => {
                const { data } = result;

                if (!data) return;

                this.state.data = data;

                this.setState(this.state); 
            }
        );
    }

    requirements (params) {
        Object.assign(this.state, params || {});
        this.setState(this.state); 
    }

    game_name (params) {
        Object.assign(this.state, params || {});
        this.componentDidMount();
    }
    render() {
        const { data = [], requirements } = this.state;
       
        const listItem = data.map((detail, index) =>  {
            let minimum = requirements ? detail[requirements] : detail.minimum;

            return <div className="game-body" key={index} style={{marginBottom: "10px"}}>
                        <div className="left-image" style={{width:'40%'}}>
                            <div
                                className="bg-image"
                                style={{ backgroundImage: `url('${detail.header_image}')`, backgroundSize:'cover' }} //background
                            ></div>
                        </div>
                        <div style={{width: "57%", marginLeft: "3%" }}>
                            <div> Name: {decodeURIComponent(detail.name)}</div>
                            <div>Publisher: {detail.publisher}</div>
                            <div>Release Date: {detail.release_date}</div>
                            <div style={{marginTop: "10px"}}>
                                Requirements: {minimum}
                            </div>
                        </div> 
                    </div>
        })

        return (
        <div className="Dashboard">
            <PageNavbar active="a" />
            <div className="container movies-container">
                <div className="jumbotron">
                    <div className="movies-container">
                        <div className="row" style={{padding: "0px 20px 20px"}}>
                            <div className="col-12">
                                <Search className="margin-left-10"
                                    game_name={this.game_name.bind(this)} 
                                    requirements={this.requirements.bind(this)} 
                                    />
                            </div>
                        </div>
                        {listItem}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
