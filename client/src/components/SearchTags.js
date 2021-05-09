import React from "react";
import "../style/Dashboard.css";
import PageNavbar from "./PageNavbar";
import Search from "./SearchB";

export default class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tags: ""
        };
    }

    componentDidMount() {
        let { tags } = this.state;

        fetch(`http://localhost:8081/tagSearch?tags=${tags}`, {
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
    tags (params) {
        Object.assign(this.state, params || {});
        this.componentDidMount();
    }
    render() {
        const { data = [], tags } = this.state;
       
        const listItem = data.map((detail, index) =>  {
            return <div className="game-body" key={index} style={{marginBottom: "10px"}}>
                        <div className="left-image" style={{width:'40%'}}>
                            <div
                                className="bg-image"
                                style={{ backgroundImage: `url('${detail.header_image}')`, backgroundSize:'cover' }} //background
                            ></div>
                        </div>
                        <div style={{width: "57%", marginLeft: "3%" }}>
                            <div className="margin-top-10"> Name: {decodeURIComponent(detail.name)}</div>
                            <div className="margin-top-20">Publisher: {detail.publisher}</div>
                            <div className="margin-top-20">Release Date: {detail.release_date}</div>
                            <div className="margin-top-20">Tags: {detail.steamspy_tags}</div>
                        </div> 
                    </div>
        })

        return (
        <div className="Dashboard">
            <PageNavbar active="b" />
            <div className="container movies-container">
                <div className="jumbotron">
                    <div className="movies-container">
                        <div className="row" style={{padding: "0px 20px 20px"}}>
                            <div className="col-12">
                                <Search className="margin-left-10"
                                    tags={this.tags.bind(this)} 
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
