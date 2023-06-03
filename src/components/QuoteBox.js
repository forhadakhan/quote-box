import React from 'react';
import html2canvas from 'html2canvas'; 

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            quote: '', 
            author: '', 
        };

        // Binding the handleClick method to the component instance
        this.newQuote = this.newQuote.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
    }

    // Handle click on new quote button; fetch a new quote 
    newQuote() {
        fetch('https://api.quotable.io/random')
          .then(response => response.json())
          .then(data => {
            this.setState({
              quote: data.content,
              author: data.author
            });
          })
          .catch(error => {
            console.error('Error fetching quote:', error); 
            this.setState({
                quote: "You are a beacon of inspiration, radiating greatness in everything you do.",
                author: " yourwellwisher"
              });
          });
    }
      
    

    // Handle click on save quote button; should save a jpg/png of the content of div with id 'quote-box' 
    saveQuote() {
        const quoteBox = document.getElementById('quote-box');
        html2canvas(quoteBox).then(canvas => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'quote.png';
            link.click();
        });
    }


    render() {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.state.quote)}%20${encodeURIComponent(this.state.author)}`;

        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div id="quote-box"> 
                                <p id="text">{this.state.quote}</p>
                                <p id="author">Author: {this.state.author}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button id="new-quote" className="btn btn-primary" onClick={this.newQuote}>New Quote</button>
                                <button id="save-quote" className="btn btn-primary" onClick={this.saveQuote}>Save Quote</button>
                            </div>
                            <a id="tweet-quote" className="btn btn-primary" href={tweetUrl} target="_blank" rel="noopener noreferrer">Tweet Quote</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuoteBox; 

