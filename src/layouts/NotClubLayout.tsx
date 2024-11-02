import useCustomNavigate from '@hooks/useCustomNavigate';
import { getClubsInfo } from '@libs/api/club';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const NotClubLayout = () => {
  const navigate = useCustomNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [isClubJoin, setIsClubJoin] = useState(true);

  useEffect(() => {
    const checkClubs = async () => {
      const { result } = await getClubsInfo();

      if (result.length > 0 && result.find((club) => club.clubEnglishName === clubEnglishName)) {
        navigate(ROUTE.ROOT);
        return;
      }

      setIsClubJoin(false);
    };

    checkClubs();
  }, []);

  return !isClubJoin && <Outlet />;
};

export default NotClubLayout;
