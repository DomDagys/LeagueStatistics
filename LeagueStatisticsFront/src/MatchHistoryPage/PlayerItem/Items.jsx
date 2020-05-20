import React from 'react';
import "./PlayerItem.css";

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: this.props.src1,
            src2: this.props.src2,
            src3: this.props.src3,
            src4: this.props.src4,
            src5: this.props.src5,
            src6: this.props.src6
        };
    }

    render() {
        //console.log("From Spells", this.state);
        return (
            <div className="spells">
                <img src={this.state.src1}></img>
                <img src={this.state.src2}></img>
                <img src={this.state.src3}></img>
                <div></div>
                <img src={this.state.src4}></img>
                <img src={this.state.src5}></img>
                <img src={this.state.src6}></img>
            </div>
        )
    }
}

export { Items };