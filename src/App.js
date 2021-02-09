import React from "react";
import Badge from "react-bootstrap/Badge";
import autosize from "autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

let marked = require("marked");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ` # Welcome to Markdown Previewer!
# This is H1
## This is H2
### This is H3 with some extra pounds ###
#### You get the idea ####
##### I don't need extra pounds at the end
###### H6 is the max

## Links

An inline link to [Google](https://www.google.com).

## Images

Images work exactly like links, but they have exclamation points in front. They work with references and titles too.

![Google Logo](https://www.google.com/images/errors/logo_sm.gif) and ![Happy].

[Happy]: https://wpclipart.com/smiley/happy/simple_colors/smiley_face_simple_green_small.png ("Smiley face")

Inline HTML
-----------

If markdown is too limiting, you can just insert your own <strike>crazy</strike> HTML. Span-level HTML <u>can *still* use markdown</u>. Block level elements must be separated from text by a blank line and must not have any spaces before the opening and closing HTML.

<div style='font-family: "Comic Sans MS", "Comic Sans", cursive;'>
It is a pity, but markdown does **not** work in here for most markdown parsers.
[Marked] handles it pretty well.
</div>`,
    };
  }
  updateMarkdown(markdown) {
    this.setState({ markdown });
  }
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  render() {
    // STYLES
    const appStyles = {
      backgroundColor: "#566472",
      fontFamily: "Playfair Display",
      height: "100%",
      left: 0,
      width: "100%",
      overflow: "hidden",
    };
    const textareaStyle = {
      boxShadow: "0px 0px 15px 5px grey",
      minWidth: "100%",
      textAlign: "center",
      maxHeight: "540px",
      backgroundColor: "#e9ebed",
    };
    const iconStyle = {
      color: "#e9ebed",
    };
    const creditStyle = {
      textAlign: "center",
      marginTop: "3%",
      opacity: "0.4",
    };
    const inputStyle = {
      minWidth: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      outline: "none",
    };
    const outputStyle = {
      minWidth: "100%",
      minHeight: "70vh",
      backgroundColor: "#e9ebed",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "10px",
      boxShadow: "0px 0px 15px 5px grey",
    };

    return (
      <div className="App" style={appStyles}>
        <div className="container">
          <div className="row mt-4">
            <div className="col text-center">
              <h1>
                <Badge className="text-align-center" variant="secondary">
                  Markdown Previewer
                </Badge>
              </h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col md-6">
              <div className="col text-center">
                <h3>
                  <Badge className="text-align-center" variant="secondary">
                    <FontAwesomeIcon style={iconStyle} icon={faChevronRight} />{" "}
                    Markdown Input
                  </Badge>
                </h3>
                <div className="mark-input" style={inputStyle}>
                  <textarea
                    className="input"
                    style={textareaStyle}
                    value={this.state.markdown}
                    ref={(c) => (this.textarea = c)}
                    rows={22}
                    onChange={(event) => {
                      this.updateMarkdown(event.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col md-6">
              <div className="col text-center">
                <h3>
                  <Badge className="text-align-center" variant="secondary">
                    <FontAwesomeIcon style={iconStyle} icon={faChevronRight} />{" "}
                    Markdown Output
                  </Badge>
                </h3>
                <div
                  style={outputStyle}
                  dangerouslySetInnerHTML={{
                    __html: marked(this.state.markdown),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <p style={creditStyle}>by hasan ugurlu</p>
      </div>
    );
  }
}
