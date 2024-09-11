import { useCallback, useMemo, useState } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [searchListing, setSearchListing] = useState({});

  const fetchOptions = useMemo(
    () => ({ params: searchListing }),
    [searchListing],
  );

  const {
    data: listings,
    loading,
    error,
  } = useFetch('/api/listings', fetchOptions);

  "/api/listings?{\"destination\":\"New York\",\"dates\":\"2024-09-10 to 2024-09-20\",\"guests\":2}"


  const handleFilters = useCallback((filters) => {
    setSearchListing(filters);
  }, []);

  return (
    <div className='container py-4'>
      <ListingFilters onChange={handleFilters} />
      <Separator className='my-4' />
      <DataRenderer error={error} loading={loading}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};
export default HomePage;
