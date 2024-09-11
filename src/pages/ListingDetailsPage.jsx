import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { id } = useParams();

  const { data: listing, error, loading } = useFetch(`/api/listings/${id}`);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} loading={loading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
