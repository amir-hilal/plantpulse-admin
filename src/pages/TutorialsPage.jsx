import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import TutorialCard from '../components/TutorialCard';
import { fetchTutorials } from '../redux/tutorialsSlice';

const Tutorials = () => {
  const dispatch = useDispatch();
  const { tutorials, loading, currentPage, hasMore } = useSelector(
    (state) => state.tutorials
  );

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    dispatch(fetchTutorials(1)); // Fetch the first page when the component mounts
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        fetching
      ) {
        return;
      }
      if (hasMore && !loading) {
        setFetching(true);
        dispatch(fetchTutorials(currentPage)).then(() => {
          setFetching(false);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetching, currentPage, hasMore, loading, dispatch]);


  return (
    <div className="flex flex-column justify-content-center mt-4">

      <div className="w-full">
        <h2 className="text-center">Gardening Tutorials</h2>
      </div>
      <div className="w-full grid grid-nogutter p-0 justify-content-between">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
      {loading && (
        <div className="w-full flex text-center align-items-center justify-content-center h-30rem mt-3">
          <Loading type="spin" color="#019444" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default Tutorials;
