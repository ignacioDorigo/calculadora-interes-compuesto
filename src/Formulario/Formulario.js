import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import "./Formulario.css";
import * as Yup from "yup";

const Campos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Input = styled.input`
  padding: 1rem 1rem;
  border: 1px solid #e1e1e1;
  outline-color: palevioletred;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
`;

const Boton = styled.button`
  margin-top: 1rem;
  border: 1px solid palevioletred;
  border-radius: 3px;
  font-weight: bold;
  padding: 1rem 2rem;
  cursor: pointer;
  background-color: #fff;
  color: palevioletred;

  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: palevioletred;
    color: #fff;
  }
`;

const estadoInicial = {
  depositoInicial: "",
  constribucionAnual: "",
  aniosInvertida: "",
  interesEstimado: "",
};

const Formulario = () => {
  const formik = useFormik({
    initialValues: estadoInicial,
    onSubmit: async (formulario) => {
      try {
        console.log(formulario);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Campos>
        <Campo>
          <Label htmlFor="depositoInicial">Deposito Inicial</Label>
          <Input
            id="depositoInicial"
            name="depositoInicial"
            placeholder="Deposito inicial"
            value={formik.values.depositoInicial}
            onChange={formik.handleChange}
          ></Input>
        </Campo>
        <Campo>
          <Label htmlFor="constribucionAnual">Contribucion anual</Label>
          <Input
            id="constribucionAnual"
            name="constribucionAnual"
            value={formik.values.constribucionAnual}
            onChange={formik.handleChange}
          ></Input>
        </Campo>
        <Campo>
          <Label htmlFor="aniosInvertida">Años</Label>
          <Input
            id="aniosInvertida"
            name="aniosInvertida"
            value={formik.values.aniosInvertida}
            onChange={formik.handleChange}
            min={1}
            type="number"
          ></Input>
        </Campo>
        <Campo>
          <Label htmlFor="interesEstimado">Interes estimado</Label>
          <Input
            id="interesEstimado"
            name="interesEstimado"
            value={formik.values.interesEstimado}
            onChange={formik.handleChange}
          ></Input>
        </Campo>
      </Campos>
      <Boton type="submit">Calcular</Boton>
    </form>
  );
};

export default Formulario;
