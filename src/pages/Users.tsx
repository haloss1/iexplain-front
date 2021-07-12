import { Card, Avatar, CardHeader, Button } from "@material-ui/core";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const Users = () => {
  return (
    <div>
      <GridContainer>
        <Card>
          <CardHeader
            avatar={<Avatar>M</Avatar>}
            title="Michael J."
            subheader="example@example.com"
          />
        </Card>
      </GridContainer>
      <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
        <Button variant="contained" color="primary">
          Load More
        </Button>{" "}
      </div>
    </div>
  );
};

export default Users;
