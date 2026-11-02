import { NextPage } from 'next';

const Home: NextPage<{ query: string }> = ({ query }) => (
  <div>
    <h1>Hello from NextJS!</h1>
    <p>Query: {query}</p>
  </div>
);

Home.getInitialProps = ({ query }) => ({ query: JSON.stringify(query) });

export default Home;
