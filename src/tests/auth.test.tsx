import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ROUTE from '@libs/constant/path';
import { getClubsInfo } from '@libs/api/club';
import { Router } from '@pages/Router';
import { getMemberInfo } from '@libs/api/member';
// import { renderHook } from "@testing-library/react-hooks";

const mockNavigate = vi.fn();

vi.mock('@hooks/usePrefixedNavigate', () => ({
  default: () => mockNavigate,
}));

vi.mock('@libs/api/member', () => ({
  getMemberInfo: vi.fn(),
}));

vi.mock('@libs/api/club', () => ({
  getClubsInfo: vi.fn(),
}));

vi.mock('@libs/api/payment', () => ({
  postPortOne: vi.fn(),
}));

// US30, 32
describe('동아리 회원은 우학동 서비스를 이용하기 위해 학교 이메일로 구글 로그인을 할 수 있다.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('우학동 서비스에 가입되지 않았으면 처음 랜딩 페이지로 이동한다. - 우학동 랜딩 페이지로 접속한 경우', async () => {
    localStorage.removeItem('accessToken');

    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
    );

    expect(screen.getByText('로그인하기')).toBeInTheDocument();
  });

  it('우학동 서비스에 가입되지 않았으면 loginRegister 페이지로 이동한다. - 동아리 전용 페이지로 접속한 경우', async () => {
    localStorage.removeItem('accessToken');

    render(
      <MemoryRouter initialEntries={['/doit']}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN_REGISTER);
    });
  });

  it('우학동 서비스에 가입되었지만 인적사항을 등록하지 않았으면 memberRegister 페이지로 이동한다.', async () => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: null });
    (getClubsInfo as Mock).mockResolvedValue({ result: [] });

    render(
      <MemoryRouter initialEntries={['/doit']}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.MEMBER_REGISTER);
    });
  });

  it('우학동 서비스에 가입되었고 인적사항을 등록했지만 동아리 가입을 하지 않았으면 clubRegister 페이지로 이동한다.', async () => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: '01012345678' });
    (getClubsInfo as Mock).mockResolvedValue({ result: [] });

    render(
      <MemoryRouter initialEntries={['/doit']}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.CLUB_REGISTER);
    });
  });

  it('우학동 서비스에 가입되었고 인적사항을 등록했고 동아리 가입도 했으면 동아리 전용 페이지로 이동한다.', async () => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: '01012345678' });

    const result = [
      {
        clubId: 1,
        clubName: '두잇',
        clubEnglishName: 'doit',
        clubImage: '',
        clubDescription: '두잇입니다',
        clubRoom: '구학생회관 234호',
        clubGeneration: '1기',
        clubDues: '10000',
      },
    ];
    (getClubsInfo as Mock).mockResolvedValue({ result });

    render(
      <MemoryRouter initialEntries={['/doit']}>
        <Router />
      </MemoryRouter>,
    );

    expect(screen.getByText('동아리 전용 페이지')).toBeInTheDocument();
  });
});