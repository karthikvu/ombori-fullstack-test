import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../../api";
import LazyInfiniteLoader from "../../components/LazyInfiniteLoader";
import LoadingPulse from "../../components/LoadingPulse";
import UserListItem from "../../components/UserListItem";
import { ApiResponse, InitialState, TUser } from "../../types";

const initialState = {
  page: 0,
  data: [],
  total_pages: Infinity,
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<
    ApiResponse<TUser> | InitialState<TUser>
  >(initialState);

  useEffect(() => {
    // 3 seconds as per requirement. Ideally I would use the api call then chain
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  const fetchData = useCallback(() => {
    // Dont load anymore if all pages are loaded
    if (userData.total_pages === userData.page) {
      return;
    }

    fetchUsers(userData?.page + 1).then((resp) => {
      // update state with latest page information, and concat all user data
      setUserData((apiResp) => ({
        ...resp.data,
        data: [...(apiResp?.data || []), ...resp.data.data],
      }));
    });
  }, [userData]);

  if (isLoading) return <LoadingPulse />;

  const data = userData?.data || [];
  return (
    <LazyInfiniteLoader
      onPageEnd={fetchData}
      finished={userData.total_pages === userData.page}
    >
      {data.map((user, index) => (
        <UserListItem user={user} key={user.id} />
      ))}
    </LazyInfiniteLoader>
  );
};

export default HomePage;
