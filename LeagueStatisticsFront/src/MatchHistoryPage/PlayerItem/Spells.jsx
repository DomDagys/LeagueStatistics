import React from 'react';
import "./PlayerItem.css";

class Spells extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: this.props.src1,
            src2: this.props.src2
        };
    }

    render() {
        //console.log("From Spells", this.state);
        return (
            <div className="spells">
                <img src={this.state.src1}></img>
                <div></div>
                <img src={this.state.src2}></img>
            </div>
        )
    }
}

export { Spells };