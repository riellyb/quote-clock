import { graphql } from "gatsby";
import React from "react";
import moment from "moment";
import Layout from "../components/layout";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuote: {
        id: "d92f1a2f-b68a-5a7e-bfdb-0d3c10ab651d",
        author: "Elie Wiesel",
        quote:
          "Six minutes to five. Six minutes to go. Suddenly I felt quite clearheaded. There was an unexpected light in the cell; the boundaries were drawn, the roles well defined. The time of doubt and questioning and uncertainty was over.",
        time: "04:54",
        timeLong: "six minutes to five",
        title: "Dawn: A Novel",
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

  tick() {
    const data = this.props.data.allQuotesCsv;
    console.log("updating time");
    const time = moment().format("HH:mm");

    const currentQuotes = data.edges.filter(quote => {
      return quote.node.time == time;
    });

    const currentQuote =
      (currentQuotes &&
        currentQuotes[Math.floor(Math.random() * currentQuotes.length)].node) ||
      this.state.currentQuote;

    console.log("currentQuotes: ", currentQuotes);

    this.setState({
      currentQuote: currentQuote,
    });
  }
  render() {
    const { currentQuote } = this.state;
    const time = moment().format("dddd, MMMM Do YYYY, h:mm a");

    console.log("currentQuote: ", currentQuote);
    return (
      <Layout>
        <h1>{time}</h1>
        <blockquote>
          <p>{currentQuote.quote.replace("\\", "")}</p>
          <div>
            {currentQuote.title} - {currentQuote.author}
          </div>
        </blockquote>
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
