import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import "./Formulario.css";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  depositoInicial: Yup.number()
    .typeError("Debe ser un número")
    .required("El depósito es obligatorio")
    .min(0, "Debe ser mayor o igual a 0"),

  constribucionAnual: Yup.number()
    .typeError("Debe ser un número")
    .required("La contribución anual es obligatoria")
    .min(0, "Debe ser mayor o igual a 0"),

  aniosInvertida: Yup.number()
    .typeError("Debe ser un número")
    .required("Debe ingresar una cantidad de años")
    .min(1, "Debe ser al menos 1 año")
    .integer("Debe ser un número entero"),

  interesEstimado: Yup.number()
    .typeError("Debe ser un número")
    .required("El interés estimado es obligatorio")
    .min(0, "Debe ser mayor o igual a 0"),
});

const Form = styled.form``;

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
const MensajeError = styled.div`
  color: red;
`;

const estadoInicial = {
  depositoInicial: "",
  constribucionAnual: "",
  aniosInvertida: "",
  interesEstimado: "",
};

const Formulario = ({ calcularInteresCompuesto }) => {
  const formik = useFormik({
    initialValues: estadoInicial,
    validationSchema: validationSchema,
    onSubmit: async (formulario) => {
      try {
        let timerInterval;
        Swal.fire({
          title: "Calculando tu interes compuesto",
          html: "Tu interes estara listo en <b></b> milisegundos.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            const resultado = calcularInteresCompuesto(
              Number(formulario.depositoInicial),
              Number(formulario.constribucionAnual),
              Number(formulario.aniosInvertida),
              Number(formulario.interesEstimado)
            );
            console.log(`GANANCIA FINAL DE --> ${resultado}`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Campos>
        <Campo>
          <Label htmlFor="depositoInicial">Deposito Inicial</Label>
          <Input
            id="depositoInicial"
            name="depositoInicial"
            placeholder="Deposito inicial"
            value={formik.values.depositoInicial}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></Input>
          <MensajeError>
            {formik.touched.depositoInicial && formik.errors.depositoInicial ? (
              formik.errors.depositoInicial
            ) : (
              <></>
            )}
          </MensajeError>
        </Campo>
        <Campo>
          <Label htmlFor="constribucionAnual">Contribucion anual</Label>
          <Input
            id="constribucionAnual"
            placeholder="Contribucion anual"
            name="constribucionAnual"
            value={formik.values.constribucionAnual}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></Input>
          <MensajeError>
            {formik.touched.constribucionAnual &&
            formik.errors.constribucionAnual ? (
              formik.errors.constribucionAnual
            ) : (
              <></>
            )}
          </MensajeError>
        </Campo>
        <Campo>
          <Label htmlFor="aniosInvertida">Años</Label>
          <Input
            id="aniosInvertida"
            name="aniosInvertida"
            placeholder="Años"
            value={formik.values.aniosInvertida}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min={1}
            type="number"
          ></Input>
          <MensajeError>
            {formik.touched.aniosInvertida && formik.errors.aniosInvertida ? (
              formik.errors.aniosInvertida
            ) : (
              <></>
            )}
          </MensajeError>
        </Campo>
        <Campo>
          <Label htmlFor="interesEstimado">Interes estimado</Label>
          <Input
            id="interesEstimado"
            name="interesEstimado"
            value={formik.values.interesEstimado}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Interes estimado"
          ></Input>
          <MensajeError>
            {formik.touched.interesEstimado && formik.errors.interesEstimado ? (
              formik.errors.interesEstimado
            ) : (
              <></>
            )}
          </MensajeError>
        </Campo>
      </Campos>
      <Boton type="submit">Calcular</Boton>
    </Form>
  );
};

export default Formulario;
