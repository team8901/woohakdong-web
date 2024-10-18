import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const landingPageURLs = [
  "",
  "home",
  "loginRegister",
  "clubJoinOnboarding",
];

const useAuthRedirect = () => {
  const navigate = usePrefixedNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("accessToken");

    // Extract the first segment of the path
    const firstSegment = location.pathname.split("/")[1];
    const isClubURL = !landingPageURLs.includes(firstSegment);

    if (!isClubURL) {
      if (!isLoggedIn) {
        navigate(`/loginRegister`);
      } else {
        navigate(`/home`);
      }
      return;
    }

    if (!isLoggedIn) {
      navigate(`/loginRegister`);
    } else {
      navigate(`/clubJoinOnboarding`);
    }
  }, []);
};

export default useAuthRedirect;
