module.exports = {
  siteMetadata: {
    title: `Quote of the Minute`,
    description: `A simple project to display a quote that is related to every minute of the day`,
    author: `Brendan Rielly`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `quote-of-the-minute`,
        short_name: `quote-minute`,
        start_url: `/`,
        background_color: `#ffcb23`,
        theme_color: `#ffcb23`,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
