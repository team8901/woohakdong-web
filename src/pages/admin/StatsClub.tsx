import Body1 from '@components/Body1';
import Button from '@components/Button';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import { useTerm } from '@contexts/TermContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getClubItemCount, getClubItemsHistory, getClubPeriod, getClubStatsMembers } from '@libs/api/admin';
import { SLICED_TERMS_LABEL, TERMS_MENU } from '@libs/constant/admin';
import ROUTE from '@libs/constant/path';
import getRemainingDays from '@libs/util/getRemainingDays';
import Dropdown from '@pages/admin/components/Dropdown';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { AdminClubItemsHistoryResponseData, AdminClubMembersResponseData, SchoolsResponseData } from 'types/admin';
import { ClubInfoResponseData } from 'types/club';

type PerDate = { [date: string]: number };

const StatsClubPage = () => {
  const { state } = useLocation();
  const school: SchoolsResponseData = state.school;
  const club: ClubInfoResponseData = state.club;
  const { clubId } = club;
  const [startDate, setStartDate] = useState('');
  const [memberCounts, setMemberCounts] = useState<number[]>([]);
  const [memberCountsPerDate, setMemberCountsPerDate] = useState<PerDate[]>([]);
  const [itemCounts, setItemCounts] = useState<number[]>([]);
  const [itemCountsPerDate, setItemCountsPerDate] = useState<PerDate[]>([]);
  const [itemCountsPerCategory, setItemCountsPerCategory] = useState<PerDate[]>([]);
  const [members, setMembers] = useState<AdminClubMembersResponseData[][]>([]);
  const [itemsHistory, setItemsHistory] = useState<AdminClubItemsHistoryResponseData[][]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const { selectedTermIdx, setSelectedTermIdx } = useTerm();
  const navigate = useCustomNavigate();

  const initData = () => {
    setMembers([]);
    setMemberCounts([]);
    setItemCounts([]);
    setItemsHistory([]);
    setMemberCountsPerDate([]);
    setItemCountsPerDate([]);
    setItemCountsPerCategory([]);
  };

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';

    (async () => {
      setIsLoading(true);
      initData();
      try {
        const { startDate } = await getClubPeriod({ clubId });
        setStartDate(startDate);

        for (const { term } of TERMS_MENU) {
          const { result: membersResult } = await getClubStatsMembers({ clubId, assignedTerm: term });
          const { count: itemCount } = await getClubItemCount({ clubId, assignedTerm: term });
          const { result: itemsHistoryResult } = await getClubItemsHistory({ clubId, assignedTerm: term });

          setMembers((prev) => [...prev, membersResult]);
          setMemberCounts((prev) => [...prev, membersResult.length]);
          setItemCounts((prev) => [...prev, itemCount]);
          setItemsHistory((prev) => [...prev, itemsHistoryResult]);

          // setMemberCountsPerDate
          // membersResult: [{ createAt }] 날짜별 회원 수 구하기
          const memberCountsPerDate = membersResult.reduce((acc, member) => {
            const date = member.createAt.split('T')[0]; // Assuming createAt is in ISO format
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {} as PerDate);
          setMemberCountsPerDate((prev) => [...prev, memberCountsPerDate]);

          // setItemCountsPerDate
          // itemsHistoryResult: [{ itemCategory, itemRentalDate, itemReturnDate }] 날짜별 물품 수 구하기
          const itemCountsPerDate = itemsHistoryResult.reduce(
            (acc, item) => {
              const rentalDate = item.itemRentalDate.split('T')[0]; // Assuming itemRentalDate is in ISO format
              acc[rentalDate] = (acc[rentalDate] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          );
          setItemCountsPerDate((prev) => ({ ...prev, ...itemCountsPerDate }));

          // setItemCountsPerCategory
          // itemsHistoryResult: [{ itemCategory, itemRentalDate, itemReturnDate }] 카테고리별 물품 수 구하기
          const itemCountsPerCategory = itemsHistoryResult.reduce(
            (acc, item) => {
              const category = item.itemCategory;
              acc[category] = (acc[category] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          );
          setItemCountsPerCategory((prev) => ({ ...prev, ...itemCountsPerCategory }));
        }
      } catch (error) {
        console.error(error);
        setToastMessage(`데이터를 불러오는데 실패했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading)
    return (
      <div className="px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={`${index}-top`} height={100} borderRadius={14} />
          ))}
        </div>
        <Skeleton height={22} borderRadius={14} className="mt-[30px]" />
        <div className="mt-[12px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={290} borderRadius={14} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="fixed left-[30px]">
        <Dropdown selectedTermIdx={selectedTermIdx} setSelectedTermIdx={setSelectedTermIdx} />
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text={`학교별 동아리 > ${school.schoolName} > ${club.clubName}`} />
        <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${memberCounts[selectedTermIdx]}개`} />
          </div>
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="총 등록된 물품 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${itemCounts[selectedTermIdx]}개`} />
          </div>
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="동아리 운영 기간" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${getRemainingDays(startDate)}일`} />
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2">
        <Chart
          options={{
            title: {
              text: '분기별 회원 수',
            },
            chart: {
              id: 'stats-member-count',
            },
            xaxis: {
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '회원 수', data: memberCounts.slice(0, -1) }]}
          type="bar"
        />
        {/* <Chart
          options={{
            title: {
              text: '날짜별 회원 수',
            },
            chart: {
              id: 'stats-member-count-per-date',
            },
            xaxis: {
              categories: Object.keys(memberCountsPerDate[selectedTermIdx]),
            },
          }}
          series={[
            {
              name: '회원 수',
              data: Object.values(memberCountsPerDate[selectedTermIdx]),
            },
          ]}
          type="bar"
        /> */}
        <Chart
          options={{
            title: {
              text: '분기별 물품 수',
            },
            chart: {
              id: 'stats-payments',
            },
            xaxis: {
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '물품 수', data: itemCounts.slice(0, -1) }]}
          type="bar"
        />
      </div>

      <div className="fixed bottom-[20px] right-[30px]">
        <Button text="전체 통계 보기" onClick={() => navigate(ROUTE.ADMIN_STATS)} className="w-[170px]" />
      </div>
    </div>
  );
};

export default StatsClubPage;