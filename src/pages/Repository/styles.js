import styled from "styled-components";

export const Loading = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 1px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #333;

      &:hover {
        color: #7159c1;
      }
    }

    span {
      background: #eee;
      color: #333;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 600;
      height: 20px;
      padding: 3px 4px;
      margin-left: 10px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
`;

export const OptButton = styled.button.attrs(props => ({
  type: "button",
  disabled: props.opt === props.selected,
}))`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  border: 2px solid #7159c1;
  margin-right: 5px;

  span {
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 4px;
    color: #7159c1;
    font-weight: bold;
    background: #fff;
    transition: 0.35s;

    &:hover {
      background: #7159c1;
      color: #fff;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`;

export const PageButton = styled.button.attrs(props => ({
  type: "button",
  disabled: props.page === 1,
}))`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  border: 1px solid #7159c1;

  span {
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 4px;
    color: #7159c1;
    font-weight: bold;
    background: #fff;
    transition: 0.35s;

    &:hover {
      background: #7159c1;
      color: #fff;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
