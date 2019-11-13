import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form.attrs(props => ({
  error: props.error,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const Input = styled.input`
  flex: 1;
  border: ${props => (props.error ? "1px solid #e12" : "1px solid #eee")};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
`;

const rotate = keyframes` /**utilizando os keyframes que foram importados anteriormente */
from { /**o item saira desse estado */
  transform: rotate(0deg);
}

to { /**para esse estado */
  transform: rotate(360deg)
}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled:
    props.loading /* Estamos atribuindo a variavel disabled quando a variavel loading existir no component */,
}))`
  background: #7150c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* quando quisermos nos referir ao componente em questao usamos o & */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
