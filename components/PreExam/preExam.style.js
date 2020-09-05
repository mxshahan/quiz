import "styled-components";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

export const PreExamHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px 25px;
  span {
    color: #427eff;
  }
`;
export const PreExamBody = styled.div`
  background: #ffffff;
  padding: 35px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px 0.5px #aaa;
`;
export const TitleLeft = styled.div`
  width: -webkit-fill-available;
  h2 {
    color: #233252;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 0;
  }
  p {
    color: #262626;
    font-size: 19px;
    font-weight: 600;
  }
`;

export const PreExamTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7ecf7;
  img {
    float: left;
    display: inline-block;
    max-width: 100px;
    margin-right: 15px;
    @media (max-width: 900px) {
      float: none;
    }
  }
  p {
    min-width: fit-content;
  }
`;

export const PreExamDesc = styled.p`
  color: #233252;
  font-size: 20px;
  padding: 20px 0;
  margin-bottom: 0;
  border-bottom: 1px solid #e7ecf7;
`;
export const PreExamMiniTitle = styled.h2`
  color: #fd8a16;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 25px 0;
  margin-bottom: 0;
`;

export const StyledTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ isTableHeader }) =>
    isTableHeader ? "2px solid #e7ecf7;" : "1px solid #e7ecf7;"};
  padding-bottom: 15px;
  margin-bottom: 15px;
  h2 {
    font-weight: ${({ isTableHeader }) => (isTableHeader ? "bold" : "normal")};
    font-size: ${({ isTableHeader }) => !isTableHeader && "18px"};
    color: #233252;
    margin-bottom: 0;
  }
  p {
    font-weight: ${({ isTableHeader }) => (isTableHeader ? "bold" : "normal")};
    font-size: ${({ isTableHeader }) => (isTableHeader ? "21px" : "18px")};
    color: #233252;
  }
`;
export const BtnStyled = styled(Button)`
  background: #3168e1 !important;
  border-radius: 5px;
  font-size: 15px;
  color: white !important;
  width: 100%;
`;
