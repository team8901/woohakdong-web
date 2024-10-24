import axiosInstance from '@libs/api/axiosInstance';
import { getGroupInfo } from '@libs/api/group';
import { IMPResponse } from 'types/iamport';
import {
  GroupJoinConfirmProps,
  GroupJoinConfirmRequestData,
  GroupJoinProps,
  GroupJoinRequestData,
  GroupJoinResponseData,
  PortOneProps,
  PortOneRequestData,
} from 'types/payment';

const postGroupJoin = async ({ merchantUid, groupId }: Readonly<GroupJoinProps>) => {
  const data: GroupJoinRequestData = { merchantUid };

  const res = await axiosInstance.post<GroupJoinResponseData>(
    `${import.meta.env.VITE_API_URL}/v1/groups/${groupId}/joins`,
    data,
  );
  const { orderId } = res.data;
  return orderId;
};

const postGroupJoinConfirm = async ({ merchantUid, groupId, impUid, orderId }: Readonly<GroupJoinConfirmProps>) => {
  const data: GroupJoinConfirmRequestData = { merchantUid, impUid, orderId };

  await axiosInstance.post(`${import.meta.env.VITE_API_URL}/v1/groups/${groupId}/joins/confirms`, data);
};

window.IMP.init('imp06661826');

const postPortOne = async ({
  clubId,
  pg,
  pay_method,
  merchantUid,
  name,
  amount,
  buyer_email,
  buyer_name,
  buyer_tel,
}: Readonly<PortOneProps>) => {
  return new Promise((resolve, reject) => {
    const data: PortOneRequestData = {
      pg,
      pay_method,
      merchant_uid: merchantUid, // 주문번호
      name, // gatheringName or gatheringDescription
      amount, // gatheringAmount
      buyer_email, // memberEmail
      buyer_name, // memberName
      buyer_tel, // memberPhoneNumber
      buyer_addr: '', // 생략
      buyer_postcode: '', // 생략
    };
    window.IMP.request_pay(data, async (response: IMPResponse) => {
      // console.log(response);
      // if (response.error_code != null) {
      //   return alert(
      //     `결제에 실패하였습니다. 에러 내용: ${response.error_msg}`
      //   );
      // }
      if (!response.success) {
        return;
      }
      const impUid = response.imp_uid;
      const { groupId } = await getGroupInfo({ clubId });
      console.log('groupId', groupId);
      const orderId = await postGroupJoin({ merchantUid, groupId });
      // console.log(merchantUid, orderId);
      if (orderId) {
        await postGroupJoinConfirm({ merchantUid, groupId, impUid, orderId });
        resolve('동아리 가입이 완료되었습니다.');
      } else {
        reject(new Error('orderId를 받아오는 데 실패했습니다.'));
      }
    });
  });
};

export { postPortOne };
