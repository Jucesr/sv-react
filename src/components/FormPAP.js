import React from 'react';
import { withFormik, Form, Field} from 'formik';
import Select from 'react-select';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import moment from 'moment';
import Yup from 'yup';

moment.locale('es');

const FormPAP = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  setErrors
}) => {

  let focusedInput = 'startDate';
  const sociedades = [{
      value: 1100,
      label: 1100
    },{
      value: 1200,
      label: 1200
    },{
      value: 1300,
      label: 1300
    },{
      value: 1400,
      label: 1400
    },{
      value: 1500,
      label: 1500
    },{
      value: 1600,
      label: 1600
    },{
      value: 1700,
      label: 1700
    },{
      value: 1800,
      label: 1800
  }];
  const reg = /^[A-Za-z][/][A-Za-z]{3}[/][0-9]{3}(\D|$)/;

  const onProjectosChange = (value) => {
    const options = value.map( v => v.label);
    const new_option = options[options.length - 1];
    // console.log(options);
    if(reg.test(new_option) || new_option == null){
      setFieldValue('proyectos', value);
      setErrors({
        proyectos: null
      });
    }else{
      setErrors({
        proyectos: 'La mascara debe ser tipo (R/MXL/000)'
      });
    }
	}

  const onSociedadChange = (value) => {
    setFieldValue('sociedad', value);
  }

  const onDivisionesChange = value => {
    setFieldValue('divisiones', value);
  }

  const onFechaChange = ({startDate, endDate}) => {
    setFieldValue('fecha_inicial', startDate);
    setFieldValue('fecha_final', endDate);
  }

  const onFocusFechaChange = (focusedInput) => {
    setFieldValue('focus_fecha', focusedInput);
  }

  return (
    <Form className="form_PAP">
      <div className="form_field">
        <label>Proyecto </label>
        <Select.Creatable
					multi={true}
					onChange={onProjectosChange}
					value={values.proyectos}
          placeholder=""
          backspaceToRemoveMessage=""
          noResultsText=''
          promptTextCreator={() => ''}
          arrowRenderer={null}
          className="form_field__select"
				/>

        { errors.proyectos && <p>{errors.proyectos}</p>}
      </div>
      <div className="form_field">
        <label>Descripción</label>
        <Field className="field_input" type="text" name="descripcion" value={values.descripcion}  />
      </div>

      <div className="form_field">
        <label>Responsable</label>
        <Field className="field_input" type="text" name="responsable" value={values.responsable} />
      </div>

      <div className="form_field">
        <label>Solicitante</label>
        <Field className="field_input" type="text" name="solicitante" value={values.solicitante} />
      </div>

      <div className="form_field">
        <label>Sociedad</label>
        <Select
          className="form_field__select"
          value={values.sociedad}
          placeholder=""
          options={sociedades}
          onChange={onSociedadChange}
          noResultsText='No se encontro la sociedad'
        />
      </div>

      <div className="form_field">
        <label>Division </label>
        <Select.Creatable
					multi={true}
					onChange={onDivisionesChange}
					value={values.divisiones}
          placeholder=""
          backspaceToRemoveMessage=""
          noResultsText=''
          promptTextCreator={() => ''}
          arrowRenderer={null}
          className="form_field__select"
          clearable={true}
				/>

        { errors.divisiones && <p>{errors.divisiones}</p>}
      </div>

      <div className="form_field">
        <label>Fecha de contabilizacion</label>
        <DateRangePicker
          startDate={values.fecha_inicial} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={values.fecha_final} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={onFechaChange} // PropTypes.func.isRequired,
          focusedInput={values.focus_fecha} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={onFocusFechaChange} // PropTypes.func.isRequired,
        />
      </div>


      <div className="form_field">
        <label>Nocturno</label>
        <Field type="checkbox" name="nocturno" checked={values.nocturno} />
      </div>


      <button disabled={isSubmitting}>Submit</button>

    </Form>
  )
  //}
}

export default withFormik({
  mapPropsToValues( {
    proyectos,
    descripcion,
    responsable,
    solicitante,
    sociedad,
    divisiones,
    fecha_inicial,
    fecha_final
  }){
    return {
      proyectos: proyectos || [],
      descripcion: descripcion || '',
      responsable: responsable || '',
      solicitante: solicitante || '',
      sociedad: sociedad || '',
      divisiones: divisiones || [],
      fecha_inicial: fecha_inicial || moment(),
      fecha_final: fecha_final || moment(1000),
      focus_fecha: null,
      nocturno: false
    }
  },
  validationSchema: Yup.object().shape({
    proyectos: Yup.array().min(1, 'Debes ingresar al menos un proyecto'),
    divisiones: Yup.array().min(1, 'Debes ingresar al menos una division')
  }),
  handleSubmit(values, {props, resetForm, setErrors, setSubmitting}) {
    props.onFired({
      proyectos: values.proyectos.map(p => p.label),
      descripcion: values.descripcion,
      responsable: values.responsable,
      solicitante: values.solicitante,
      divisiones: values.divisiones.map(p => p.label),
      fecha_inicial: values.fecha_inicial.format('DD MM YYYY'),
      fecha_final: values.fecha_final.format('DD MM YYYY'),
      nocturno: values.nocturno
    });

    // setTimeout(() => {
    //   if(values.email == 'jcom.94m@gmail.com'){
    //     setErrors({
    //       email: 'the email is already taken'
    //     })
    //   }else{
    //     resetForm();
    //   }
    //   setSubmitting(false);
    // },2000);
  }
})(FormPAP);
