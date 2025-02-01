import { useEffect, useState } from 'react';
import MemeCard from './MemeCard';
import MemeCardLoader from './skeleton/MemeCardLoader';

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [fetchingMemes, setFetchingMemes] = useState(false);
  const CART_NUMS = 9;

  useEffect(() => {
    fetchMemes();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const fetchMemes = async () => {
    try {
      setFetchingMemes(true);
      const res = await fetch('https://meme-api.com/gimme/9');
      const jsonData = await res.json();
      setFetchingMemes(false);
      console.log(jsonData);
      setMemes((prevMemes) => [...prevMemes, ...jsonData.memes]);
    } catch (err) {
      console.error(`Error while fetching memes ${err.message}`);
      throw new Error(err.message);
    }
  };

  const handleScroll = () => {
    // innerHeight - height of the visible section
    // scrollY - how much user have scrolled
    // scrollHeight - total height of the web page
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      console.log('fetch more memes');
      fetchMemes();
    }
  }

  if (fetchingMemes) {
    return (
      <div className='flex flex-wrap'>
        {new Array(CART_NUMS).fill(0).map((_, index) => (
          <MemeCardLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap'>
      {memes?.map((meme) => (
        <MemeCard key={meme.title} data={meme} />
      ))}
    </div>
  );
};

export default Body;
