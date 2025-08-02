import styled from "styled-components";
import Formulario from "./Formulario/Formulario";
import { useState } from "react";

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

  @media (width<=768px) {
    padding:1rem
  }
  width: 50rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  margin-top: 10rem;
  @media (width<=768px) {
    width: 90%;
  }
`;

const App = () => {
  const [balance, setBalance] = useState(0);
  const calcularInteresCompuesto = (
    deposito,
    contribucionAnual,
    anios,
    tasaInteres
  ) => {
    let total = deposito;
    for (let index = 0; index < anios; index++) {
      total = total + contribucionAnual;
      total = total + total * tasaInteres;
    }
    // console.log(total);
    setBalance(total);
    return total;
  };

  return (
    <Container>
      <Section>
        <Formulario calcularInteresCompuesto={calcularInteresCompuesto} />
        {balance > 0 ? (
          <h1>
            Tu interés sería de{" "}
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(balance)}
          </h1>
        ) : (
          <></>
        )}
      </Section>
    </Container>
  );
};

export default App;
