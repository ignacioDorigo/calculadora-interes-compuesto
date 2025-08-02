import styled from "styled-components";
import Formulario from "./Formulario/Formulario";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;

export const Section = styled.div`
  background-color: #eee;
  border-top: 2px solid palevioletred;
  padding: 2rem 2.5rem;
  width: 50rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  margin-top: 10rem;
  @media (width<=764px) {
    width: 90%;
  }
`;

const App = () => {
  return (
    <Container>
      <Section>
        <Formulario />
      </Section>
    </Container>
  );
};

export default App;
