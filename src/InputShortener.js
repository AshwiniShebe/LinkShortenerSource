import { Component } from "react";
import InputShortenerService from './InputShortenerService';


class InputShortener extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputUrl : '',
            genLink : '',
            errors: {}
        }
        this.changeEventHandler = this.changeEventHandler.bind(this);
       // this.urlPatternValidation = this.urlPatternValidation.bind(this);
        

    }
    componentDidMount() {
    }


      handleValidation = (event) => {

        let errors = {};
        let formIsValid = true;

        if (!this.state.inputUrl) {
            formIsValid = false;
            errors["inputUrl"] = "URL Cannot be empty";

        } else if (typeof this.state.inputUrl !== "undefined") {
            if (!(this.state.inputUrl).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|w ww\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) {
                formIsValid = false;
                errors["inputUrl"] = "Invalid URL";
            }
        }

       

        this.setState({ errors: errors });
        return formIsValid;
    }

    changeEventHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
       
        this.setState({
            [name]: value
           
        });
    }

    generateUrl = (e, inputUrl) => {
        //alert("generateUrl hitted");
        let minutes = 5 * 60 * 1000; // 5 minutes
        e.preventDefault();
        const isValid = this.handleValidation();
        // alert(isValid);
       if(isValid){
        InputShortenerService.getShortenUrl(inputUrl).then((resp) => {
            // console.log("getShortenUrl response=====>>>>"+resp.data.result.full_short_link);
             this.setState({
                 genLink: resp.data.result.full_short_link
             });
             
         },setTimeout(
            () => this.setState({ genLink: "" }), 
            minutes
          ));
       }
       
    }; 

    render() {
       
        return (
        <div className="">
            <h1>Link Shortener</h1>
            <div>
                <input
                    type="text"
                    placeholder="Paste a link to shorten it"
                    id="inputUrl"
                    name="inputUrl"
                    value={this.state.inputUrl} 
                    onChange={ this.changeEventHandler}
                    />
                  
                    {/* <label id="genLink" name="genLink"></label> ,*/}
                    <button style={{ background: "green" }} onClick={(e) => this.generateUrl(e,this.state.inputUrl)}>shorten</button>
                    
            </div>
           <div> <span style={{ color: "red" }}>{this.state.errors["inputUrl"]}</span></div>
            <div>
            <input
                    type="text"
                    placeholder="Paste a link to shorten it"
                    id="genLink"
                    name="genLink"
                    value={this.state.genLink} 
                    onChange={this.changeEventHandler}
                    />
            </div>
        </div>
        );
    }
}
export default InputShortener;