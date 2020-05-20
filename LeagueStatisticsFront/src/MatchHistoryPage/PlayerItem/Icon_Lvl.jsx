import React from 'react';
import "./PlayerItem.css";

class Icon_Lvl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src,
            lvl: this.props.lvl
        };
    }

    render() {
        //console.log("From Item_Lvl", this.state);
        return (
            <div className="champ">
                <img src={this.state.src}></img>
                <div className="champ_lvl">
                    {this.state.lvl}
                </div>
            </div>
        )
    }
}

export { Icon_Lvl };