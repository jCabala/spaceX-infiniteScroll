/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Scroll.css';
import LaunchElement from './LaunchElement';
import Loading from './Loading';
import { useState, useEffect, useRef } from 'react';
import { fetchLaunches } from '../api';

const LIMIT = 10;

const Scroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreLaunches, setNoMoreLaunches] = useState(false);
  const offset = useRef(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchLaunches(LIMIT, offset.current);
      if (fetchedData.launches.length === 0) {
        setNoMoreLaunches(true);
      } else {
        const mappedData = fetchedData.launches.map(e => ({
          name: e.mission_name,
          rocket: e.rocket,
        }));

        setData(prev => [...prev, ...mappedData]);
        offset.current = offset.current + LIMIT;
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleScroll = e => {
    const scrollTop = e.target.documentElement.scrollTop;
    const scrollHeight = e.target.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (windowHeight + scrollTop + 1 >= scrollHeight && !noMoreLaunches) {
      loadData();
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='scroll'>
      {data.map((e, idx) => (
        <LaunchElement
          name={e.name}
          rocket={e.rocket.rocket_name}
          key={`launchElement-${idx}`}
        />
      ))}
      {loading && <Loading />}
      {noMoreLaunches && <h3>These are all the launches.</h3>}
    </div>
  );
};

export default Scroll;
