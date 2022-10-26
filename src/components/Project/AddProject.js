import React, { useState } from "react";

import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from '../Form/Input/Input';
import FilePicker from "../Form/Input/FilePicker";
import Image from "../Image/Image";
import { required, length } from '../../util/validators';
import { generateBase64FromImage } from '../../util/image';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { statusActions } from "../../store/statusSlice";



const PROJECT_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  }
}

const AddProject = (props) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [projectForm, setProjectForm] = useState(PROJECT_FORM);
    const [formIsValid, setFormIsValid] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const token = useSelector(state => state.status.token);
   
  const projectInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          setImagePreview(b64);
          // this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          setImagePreview(null);
          // this.setState({ imagePreview: null });
        });
    }
    setProjectForm(prevState => {
      let isValid = true;
      for (const validator of prevState[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState,
        [input]: {
          ...prevState[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      setFormIsValid(formIsValid);
      return updatedForm;
    });
  };
 
const cancelProjectChangeHandler = () => {
  setProjectForm(PROJECT_FORM);
  setFormIsValid(false);
  props.onCancelEdit()
};
const acceptProjectChangeHandler = () => {
  const formData = new FormData();
formData.append('title',projectForm.title.value)
formData.append('image', projectForm.image.value)
formData.append('content', projectForm.content.value)

fetch('http://localhost:8080/project', {

  headers: {
    Authorization: "Bearer " + token,
  },
  method: "POST", 
  body: formData
 
  
}).then(response => {
if (!response.ok){
  if (response.status === 422){
         
    throw new Error("Credential Error");
      }
      else {
        throw new Error("Server Error");
      }
}
return response.json()
}).then(result => {
console.log(result);
dispatch(
  statusActions.setNotification({
    status: "success",
    title: "Signup",
    message: "you have successfully created a project",
  })
);
setTimeout(() => {
  dispatch(
    statusActions.setNotification({
      status: "",
      title: "",
      message: "",
    })
  );
}, 5000);
navigate('/projects');
}).catch(err => {
console.log(err)
if (err.message==='Credential Error'){
  dispatch(

    statusActions.setNotification({
      status: "error",
      title: "Signup",
      message: "Please Enter title, image, content",
    })
  );
  setTimeout(() => {
    dispatch(
      statusActions.setNotification({
        status: "",
        title: "",
        message: "",
      })
    );
  }, 5000);
}
else{
  dispatch(
    statusActions.setNotification({
      status: "error",
      title: "Signup",
      message: "Something is Wrong, Please try Again",
    })
  );
  setTimeout(() => {
    dispatch(
      statusActions.setNotification({
        status: "",
        title: "",
        message: "",
      })
    );
  }, 8000);

}
})
};

const inputBlurHandler = input => {

  setProjectForm(prevState => {
    return {
  
        ...prevState,
        [input]: {
          ...prevState[input],
          touched: true
        }
      
    };
  });
};
    
    return <React.Fragment>
    <Backdrop onClick={cancelProjectChangeHandler} />
    <Modal
      title="New Post"
      acceptEnabled={formIsValid}
      onCancelModal={cancelProjectChangeHandler}
      onAcceptModal={acceptProjectChangeHandler}
      isLoading={!props.loading}
    >
      <form>
        <Input
          id="title"
          label="Title"
          control="input"
          onChange={projectInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'title')}
          valid={projectForm['title'].valid}
          touched={projectForm['title'].touched}
          value={projectForm['title'].value}
        />
        <FilePicker
          id="image"
          label="Image"
          control="input"
          onChange={projectInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'image')}
          valid={projectForm['image'].valid}
          touched={projectForm['image'].touched}
        />
        <div className="new-post__preview-image">
          {!imagePreview && <p>Please choose an image.</p>}
          {imagePreview && (
            <Image imageUrl={imagePreview} contain left />
          )}
        </div>
        <Input
          id="content"
          label="Content"
          control="textarea"
          rows="5"
          onChange={projectInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'content')}
          valid={projectForm['content'].valid}
          touched={projectForm['content'].touched}
          value={projectForm['content'].value}
        />
      </form>
    </Modal>
  </React.Fragment>
};


export default AddProject;