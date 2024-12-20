import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import {
  AdminClubItemsHistoryResponseData,
  AdminClubMembersResponseData,
  AdminClubPaymentResponseData,
  AdminClubPeriodResponseData,
  AdminClubsResultResponseData,
  AdminClubStatsRequestData,
  AdminInquiryRequestData,
  AdminInquiryResponseData,
  AdminLoginRequestData,
  AdminSchoolStatsRequestData,
  AssignedTermResquestData,
  CountResponseData,
  SchoolsResultResponseData,
} from 'types/admin';
import { LoginResponseData } from 'types/auth';
import { ResultResponse } from 'types/common';

const fetchLoginData = async ({ memberLoginId, memberPassword }: Readonly<AdminLoginRequestData>) => {
  axios.defaults.headers.common['Authorization'] = undefined;

  const res = await axios.post<LoginResponseData>(`${import.meta.env.VITE_API_URL}/v1/admin/auth/login`, {
    memberLoginId,
    memberPassword,
  });
  return res.data;
};

// Admin overall statistics
const getClubCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/clubs/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getSchoolCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getMemberCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/members/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getSchools = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<SchoolsResultResponseData>(
    `/v1/admin/schools${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getClubs = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(
    `/v1/admin/clubs${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getClubPayments = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<AdminClubPaymentResponseData>(
    `/v1/admin/clubPayments${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getAdminInquiryByCategory = async ({ category }: Readonly<AdminInquiryRequestData>) => {
  const res = await axiosInstance.get<ResultResponse<AdminInquiryResponseData[]>>(
    `/v1/admin/inquiry${category ? `?category=${category}` : ''}`,
  );
  return res.data;
};

// admin-school-controller
const getSchoolClubCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/clubs/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getSchoolMemberCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/members/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getSchoolItemCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/items/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getSchoolClubs = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(
    `/v1/admin/schools/${schoolId}/clubs${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

// admin-club-controller
const getClubPeriod = async ({ clubId }: Readonly<AdminClubStatsRequestData>) => {
  const res = await axiosInstance.get<AdminClubPeriodResponseData>(`/v1/admin/clubs/${clubId}/period`);
  return res.data;
};

const getClubStatsMembers = async ({ clubId, assignedTerm }: Readonly<AdminClubStatsRequestData>) => {
  const res = await axiosInstance.get<ResultResponse<AdminClubMembersResponseData[]>>(
    `/v1/admin/clubs/${clubId}/members${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getClubItemCount = async ({ clubId, assignedTerm }: Readonly<AdminClubStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/clubs/${clubId}/items/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getClubItemsHistory = async ({ clubId, assignedTerm }: Readonly<AdminClubStatsRequestData>) => {
  const res = await axiosInstance.get<ResultResponse<AdminClubItemsHistoryResponseData[]>>(
    `/v1/admin/clubs/${clubId}/itemHistory${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

const getClubPaymentsByClubId = async ({ clubId, assignedTerm }: Readonly<AdminClubStatsRequestData>) => {
  const res = await axiosInstance.get<AdminClubPaymentResponseData>(
    `/v1/admin/clubs/${clubId}/clubPayments${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );
  return res.data;
};

export {
  fetchLoginData,
  getClubCount,
  getSchoolCount,
  getMemberCount,
  getSchools,
  getClubs,
  getClubPayments,
  getSchoolClubCount,
  getSchoolMemberCount,
  getSchoolItemCount,
  getSchoolClubs,
  getClubPeriod,
  getClubStatsMembers,
  getClubItemCount,
  getClubItemsHistory,
  getAdminInquiryByCategory,
  getClubPaymentsByClubId,
};
