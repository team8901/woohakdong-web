import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { getClubInfo } from '@libs/api/club';
import ROUTE from '@libs/constant/path';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type DrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer = ({ isOpen, toggleDrawer }: Readonly<DrawerProps>) => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useCustomNavigate();
  const [clubName, setClubName] = useState('');

  useEffect(() => {
    if (!clubEnglishName) return;

    (async () => {
      const { clubName } = await getClubInfo({
        clubEnglishName,
      });

      setClubName(clubName);
    })();
  }, [clubEnglishName]);

  useEffect(() => {
    if (!dialogRef.current) return;

    dialogRef.current.setAttribute('open', 'true');
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleDrawer();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`absolute left-0 top-0 z-50 h-full w-[55%] transform bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-[20px] px-[20px] py-[103px]">
          <Title1 text={clubName} />

          <button className="flex items-center justify-between" onClick={() => handleNavigate(ROUTE.MEMBER)}>
            <Body1 text="회원" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between" onClick={() => handleNavigate(ROUTE.ITEM)}>
            <Body1 text="물품" />
            <ChevronRightGrayIcon />
          </button>
          <button className="flex items-center justify-between">
            <Body1 text="나의 대여 물품" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between" onClick={() => handleNavigate(ROUTE.DUES)}>
            <Body1 text="회비" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between" onClick={() => handleNavigate(ROUTE.SCHEDULE)}>
            <Body1 text="일정" />
            <ChevronRightGrayIcon />
          </button>
        </div>
      </dialog>
      <button
        className={`absolute left-0 top-0 z-40 h-full w-full bg-[#20202040] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} cursor-default`}
        onClick={toggleDrawer}
      />
    </>
  );
};

export default Drawer;
