import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import styled from "styled-components";

const SinglePostStyle = styled.div`
  .single {
    display: flex;
  }
`;
export default function Single() {
  return (
    <SinglePostStyle>
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
    </SinglePostStyle>
  );
}
