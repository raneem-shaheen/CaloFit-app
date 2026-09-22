import { useEffect, useState } from 'react';
import { fetchHomeData } from '../home.service';
import { formatHeroFeedback, 
  formatTestimonials, 
  formatPureFeatures,
  formatSocialLink,
} from '../dtos/home.dto';

export function useHomeData() {
  const [heroData, setHeroData] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pureFeatures,setPureFeatures]=useState([])
  const[socialLink,setSocialLink]=useState([])
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        

        const rawData = await fetchHomeData();
        console.log("FeedBack From Backend:", rawData?.feedBack)
        

        
        const formattedHero = formatHeroFeedback(rawData.feedBack, rawData.summary);
        setHeroData(formattedHero);

        
        const formattedTestimonials = formatTestimonials(rawData.feedBack);
        
        setTestimonials(formattedTestimonials);

        const pureData=rawData?.data?.pure||rawData?.pure||[];
        setPureFeatures(formatPureFeatures(pureData));

        const contactData = rawData?.data || rawData || []
        setSocialLink(formatSocialLink(contactData));

      } catch (err) {
        console.error("error in useHomeData", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { heroData, testimonials, pureFeatures,socialLink,loading };
}