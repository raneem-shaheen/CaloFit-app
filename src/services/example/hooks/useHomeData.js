import { useEffect, useState } from 'react';
import { fetchHomeData } from '../home.service';
import { formatHeroFeedback, formatTestimonials } from '../dtos/home.dto';

export function useHomeData() {
  const [heroData, setHeroData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        

        const rawData = await fetchHomeData();
        

        
        const formattedHero = formatHeroFeedback(rawData.feedBack, rawData.summary);
        setHeroData(formattedHero);

        
        const formattedTestimonials = formatTestimonials(rawData.feedBack);
        
        setTestimonials(formattedTestimonials);

      } catch (err) {
        console.error("error in useHomeData", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { heroData, testimonials, loading };
}