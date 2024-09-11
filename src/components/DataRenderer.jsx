import { Spinner } from './ui';

const DataRenderer = ({ error, loading, children }) => {
  if (loading) {
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className='flex justify-center'>Something went wrong 🥲</div>;
  }

  return children;
};

export default DataRenderer;
