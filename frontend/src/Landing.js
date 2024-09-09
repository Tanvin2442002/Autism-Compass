import React from "react";
import { useNavigate as navigate, Link } from "react-router-dom";
import "./Landing.css";
import LandPuzzle from "./img/LandPuzzle.png";
import LandDoc from './img/LandDoc.svg';
import LandFam from './img/LandFam.svg';
import LandMother from './img/LandMother.svg';
import LandDocPrec from './img/LandDocPrec.svg';
import LandTreat from './img/LandTreat.svg';
import LandTeaching from './img/LandTeaching.svg';
import LandDelivery from './img/LandDelivery.svg';

const Landing = () => {
    return (
        <div className="langingPage">
            <div className="page1">
                <div className="Nav">
                    <Link to="/login" className="login">LOG IN</Link>
                    <Link to="/signup" className="register">SIGN UP</Link>
                </div>
                <div className="rand1C">
                    <div className="innerRand">
                        <img className="im3" src={LandPuzzle} alt="im2" width={300} height={300} />
                        <h1>AUTISM COMPASS</h1>
                        {/* <img className="im2" src={im2} alt="im2" width={100} height={100} /> */}
                    </div>
                </div>
                <div className="downImg first downL">
                    <img src={LandDoc} alt="course" width={550} height={450} />
                </div>
                <div className="downImg second downR">
                    <img src={LandFam} alt="course" width={550} height={450} />
                </div>
            </div>
            <div className="page2">
                <div className="sideImg">
                    <img src={LandMother} className="left" alt="course" />
                </div>
                <div className="sideInfo">
                    <h1>Features name.</h1>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Curae varius felis et arcu per.Himenaeos convallis porta nullam elementum arcu a, cursus vel. Interdum convallis viverra proin felis tortor tellus pulvinar. Habitasse vehicula augue quis fusce curae parturient. Praesent gravida cursus et curae phasellus quisque litora. Porta litora ligula eleifend adipiscing pharetra at dignissim integer. Feugiat non pharetra massa semper eu bibendum ullamcorper lacus sollicitudin? Fusce leo tellus tincidunt sociosqu dapibus elementum commodo integer.
                    </p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
            </div>
            <div className="page3">
                <div className="sideInfo">
                    <h1>Features name.</h1>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Curae varius felis et arcu per.Himenaeos convallis porta nullam elementum arcu a, cursus vel. Interdum convallis viverra proin felis tortor tellus pulvinar. Habitasse vehicula augue quis fusce curae parturient. Praesent gravida cursus et curae phasellus quisque litora. Porta litora ligula eleifend adipiscing pharetra at dignissim integer. Feugiat non pharetra massa semper eu bibendum ullamcorper lacus sollicitudin? Fusce leo tellus tincidunt sociosqu dapibus elementum commodo integer.
                    </p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
                <div className="sideImg">
                    <img src={LandDocPrec} className="left" alt="course" />
                </div>
            </div>
            <div className="page4">
                <div className="sideImg">
                    <img src={LandTreat} className="left" alt="course" />
                </div>
                <div className="sideInfo">
                    <h1>Features name.</h1>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Curae varius felis et arcu per.Himenaeos convallis porta nullam elementum arcu a, cursus vel. Interdum convallis viverra proin felis tortor tellus pulvinar. Habitasse vehicula augue quis fusce curae parturient. Praesent gravida cursus et curae phasellus quisque litora. Porta litora ligula eleifend adipiscing pharetra at dignissim integer. Feugiat non pharetra massa semper eu bibendum ullamcorper lacus sollicitudin? Fusce leo tellus tincidunt sociosqu dapibus elementum commodo integer.
                    </p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
            </div>
            <div className="page5">
                <div className="sideInfo">
                    <h1>Features name.</h1>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Curae varius felis et arcu per.Himenaeos convallis porta nullam elementum arcu a, cursus vel. Interdum convallis viverra proin felis tortor tellus pulvinar. Habitasse vehicula augue quis fusce curae parturient. Praesent gravida cursus et curae phasellus quisque litora. Porta litora ligula eleifend adipiscing pharetra at dignissim integer. Feugiat non pharetra massa semper eu bibendum ullamcorper lacus sollicitudin? Fusce leo tellus tincidunt sociosqu dapibus elementum commodo integer.
                    </p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
                <div className="sideImg">
                    <img src={LandDelivery} className="left" alt="course" />
                </div>
            </div>
            <div className="page6">
                <div className="sideImg">
                    <img src={LandTeaching} className="left" alt="course" />
                </div>
                <div className="sideInfo">
                    <h1>Features name.</h1>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Curae varius felis et arcu per.Himenaeos convallis porta nullam elementum arcu a, cursus vel. Interdum convallis viverra proin felis tortor tellus pulvinar. Habitasse vehicula augue quis fusce curae parturient. Praesent gravida cursus et curae phasellus quisque litora. Porta litora ligula eleifend adipiscing pharetra at dignissim integer. Feugiat non pharetra massa semper eu bibendum ullamcorper lacus sollicitudin? Fusce leo tellus tincidunt sociosqu dapibus elementum commodo integer.
                    </p>
                    <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
