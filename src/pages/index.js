import { graphql } from 'gatsby';
import React from 'react';
import moment from 'moment';
import { Transition } from 'react-transition-group';

import SEO from '../components/seo';
import Layout from '../components/layout';
import './index.scss';

const defaultStyle = {
  transition: ` opacity 200ms ease`,
  opacity: 1,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#ffcb23',
      startTransition: false,
      time: '20:01',
      currentQuote: {
        author: 'Kurt Vonnegut',
        time: '20:01',
        timeLong: "a little after eight o'clock",
        title: 'Slaughterhouse 5',
        quote:
          "It was only a little after eight o'clock, so all the shows were about silliness or murder.",
      },
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000);
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  findLastQuote(time) {
    const data = this.props.data.allQuotesCsv;
    let currentQuotes = data.edges.filter(quote => {
      return quote.node.time == time;
    });

    if (currentQuotes.length < 1) {
      let index;

      //look back 15 minutes to find a time with a quote
      for (index = 0; index < 15; index++) {
        let thisTime = moment().subtract(index, 'minutes').format('HH:mm');

        currentQuotes = data.edges.filter(quote => {
          return quote.node.time == thisTime;
        });

        if (currentQuotes.length >= 1) {
          break;
        }
      }
    }
    //pick a random quote if there are more than one associated with the current time
    const randomIndex = Math.floor(Math.random() * currentQuotes.length);

    return (
      (currentQuotes && currentQuotes[randomIndex].node) ||
      this.state.currentQuote
    );
  }

  tick() {
    console.log('updating time');
    const time = moment().format('HH:mm');

    const currentQuote = this.findLastQuote(time);

    if (currentQuote.time !== this.state.time) {
      this.setState({
        currentQuote: currentQuote,
        time: currentQuote.time,
        startTransition: true,
      });
    } else {
      this.setState({
        time: time,
      });
    }
  }
  render() {
    const { currentQuote, backgroundColor, startTransition } = this.state;
    const time = moment().format('h:mm a');

    const formattedQuote = currentQuote.quote
      .replace(/\\/g, '')
      .replace(
        currentQuote.timeLong,
        `<span class="time-bold">${currentQuote.timeLong}</span>`
      );

    return (
      <Layout backgroundColor={backgroundColor}>
        <SEO title="Quote of the Minute" />
        <Transition unmountOnExit in={startTransition} timeout={1000}>
          {state => (
            <div
              className="quote-container"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <div className="time" style={{ color: backgroundColor }}>
                {time}
              </div>
              <blockquote
                className="quote"
                dangerouslySetInnerHTML={{ __html: formattedQuote }}
              />
              <div className="title-container">
                <div className="title">{currentQuote.title}</div>
                <div className="author">{currentQuote.author}</div>
              </div>
            </div>
          )}
        </Transition>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allQuotesCsv {
      edges {
        node {
          author
          quote
          time
          timeLong
          title
        }
      }
    }
  }
`;

export default IndexPage;
