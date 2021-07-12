import { Card, Avatar, CardHeader, Button } from "@material-ui/core";
import getUsers from "functions/getUsers";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";

interface userProps {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const GridContainer = styled.div`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const StatusLabel = styled.div`
  text-align: center;
  font-size: 1.7rem;
  margin: 1rem 0;
  color: grey;
`;

const StyledCard = styled(Card)`
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Users = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("users", getUsers, {
    getNextPageParam: (lastPage) =>
      lastPage.total_pages === lastPage.page ? undefined : lastPage.page + 1,
  });

  return (
    <div>
      {status === "loading" ? (
        <StatusLabel>Loading...</StatusLabel>
      ) : status === "error" ? (
        <StatusLabel>Error: {(error as Error)?.message}</StatusLabel>
      ) : (
        <>
          <GridContainer>
            {data
              ? data.pages.map((page) =>
                  page.data.map((user: userProps, i: number) => (
                    <StyledCard key={i}>
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={`${user.first_name} ${user.last_name}`}
                            src={user.avatar}
                          />
                        }
                        title={`${user.first_name} ${user.last_name}`}
                        subheader={user.email}
                      />
                    </StyledCard>
                  ))
                )
              : ""}
          </GridContainer>

          <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
