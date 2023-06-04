import React from 'react';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
    };

    this.newQuote = this.newQuote.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
  }

  componentDidMount() {
    this.newQuote();
  }

  newQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          quote: data.content,
          author: data.author,
        });
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
        this.setState({
          quote: "You are a beacon of inspiration, radiating greatness in everything you do.",
          author: "Your well-wisher",
        });
      });
  }

  saveQuote() {
    const quoteBox = document.getElementById('quote-box');
    html2canvas(quoteBox).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quote.png';
      link.click();
    });
  }

  render() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                     `${this.state.quote}\n-${this.state.author}`)}`;

    return (
      <div className="container">
        <div className="row align-items-center justify-content-center vh-100">
          <div className="col-12 col-md-6">
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col-auto">
                <FontAwesomeIcon icon={faQuoteLeft} size="3x" />
              </div>
            </div>
            <div className="row align-items-center justify-content-center border border-primary bg-light rounded shadow mb-4">
              <div className="col text-center blockquote p-5" id="quote-box">
                <p id="text" className="display-5 mb-3">{this.state.quote}</p>
                <p className='text-body-secondary' id="author">- {this.state.author}</p>
              </div>
            </div>
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col-auto">
                <div className="btn-group">
                  <button id="new-quote" className="btn btn-primary m-1" onClick={this.newQuote}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> &nbsp; 
                    New Quote
                  </button>
                  <button id="save-quote" className="btn btn-primary m-1" onClick={this.saveQuote}>
                    <FontAwesomeIcon icon={faDownload} className="mr-5" />  &nbsp;
                    Save Quote
                  </button>
                  <a
                    id="tweet-quote"
                    className="btn btn-primary m-1"
                    href={tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="mr-2" /> &nbsp; 
                    Tweet Quote
                  </a>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col text-center">
                <p className='font-monospace text-dark-emphasis text-opacity-50'>A random quote box.</p> 
                <p className='font-monospace text-dark-emphasis text-opacity-25'>
                    Code by <a href='https://github.com/forhadakhan'>@forhadakhan</a> | 
                    <a href='https://github.com/forhadakhan/quote-box'>code repo</a> 
                </p> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
