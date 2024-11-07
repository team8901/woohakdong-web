import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title3 from '@components/Title3';
import { getClubInfo } from '@libs/api/club';
import { postClubItemBorrow } from '@libs/api/item';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ClubItem } from 'types/item';

const ClubItemDetailPage = () => {
  const { state } = useLocation();
  const initialItem: ClubItem = state.item;
  const [item, setItem] = useState<ClubItem>(initialItem);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  const handleBorrow = async () => {
    if (!clubEnglishName) return;

    if (!item.itemAvailable) {
      alert('대여가능한 물품이 아닙니다.');
      return;
    }

    const { clubId } = await getClubInfo({
      clubEnglishName,
    });

    try {
      await postClubItemBorrow({ clubId, itemId: item.itemId });

      alert('대여 신청이 완료되었습니다.');

      setItem((prevItem) => ({
        ...prevItem,
        itemUsing: true,
      }));
    } catch (error) {
      alert(`대여 신청 중 오류가 발생했습니다. ${error}`);
    }
  };

  const getButtonText = (item: ClubItem) => {
    if (!item.itemAvailable) {
      return '대여 불가';
    }

    if (item.itemUsing) {
      return '대여 중';
    }

    return '대여하기';
  };

  const getButtonBgColor = (item: ClubItem) => {
    if (!item.itemAvailable) {
      return 'var(--color-lightRed)';
    }

    if (item.itemUsing) {
      return 'var(--color-lightGray)';
    }

    return 'var(--color-primary)';
  };

  const getTextColor = (item: ClubItem) => {
    if (!item.itemAvailable) {
      return 'var(--color-red)';
    }

    if (item.itemUsing) {
      return 'var(--color-darkGray)';
    }

    return 'white';
  };

  return (
    <div className="relative h-full pb-[70px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar />
      </div>

      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px] p-[20px]">
        <div className="flex flex-col items-center gap-[20px]">
          <img
            alt="물품"
            // src={item.itemPhoto || '/logo.svg'}
            src={'/logo.svg'}
            className="h-[192px] w-[192px] rounded-[14px] border border-lightGray"
          />
          <div className="flex flex-col items-center gap-[8px]">
            <Body2 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
            <Title3 text={item.itemName} className="text-center" />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 설명" className="text-darkGray" />
            <div className="rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemDescription} className="text-justify" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 위치 및 대여 가능 일 수" className="text-darkGray" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemLocation} />
              <Body1 text={`${item.itemRentalMaxDay}일`} />
            </div>
          </div>
        </div>
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button
          text={getButtonText(item)}
          onClick={handleBorrow}
          disabled={!item.itemAvailable || item.itemUsing}
          bgColor={getButtonBgColor(item)}
          textColor={getTextColor(item)}
        />
      </div>
    </div>
  );
};

export default ClubItemDetailPage;
