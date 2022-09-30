import React, { useCallback, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from '../Form/Input/Input';
import FilePicker from "../Form/Input/FilePicker";
import Image from "../Image/Image";
import { required, length } from '../../util/validators';
import { generateBase64FromImage } from '../../util/image';





const AddPost = (props) => {
    const [postForm, setPostForm] = useState({
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
      });
    const [formIsValid, setFormIsValid] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
   
  const postInputChangeHandler = (input, value, files) => {
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
    setPostForm(prevState => {
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
 
const cancelPostChangeHandler = () => {};
const acceptPostChangeHandler = () => {};

const inputBlurHandler = () => {}; 
    
    return <React.Fragment>
    <Backdrop onClick={cancelPostChangeHandler} />
    <Modal
      title="New Post"
      acceptEnabled={formIsValid}
      onCancelModal={cancelPostChangeHandler}
      onAcceptModal={acceptPostChangeHandler}
      isLoading={props.loading}
    >
      <form>
        <Input
          id="title"
          label="Title"
          control="input"
          onChange={postInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'title')}
          valid={postForm['title'].valid}
          touched={postForm['title'].touched}
          value={postForm['title'].value}
        />
        <FilePicker
          id="image"
          label="Image"
          control="input"
          onChange={postInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'image')}
          valid={postForm['image'].valid}
          touched={postForm['image'].touched}
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
          onChange={postInputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'content')}
          valid={postForm['content'].valid}
          touched={postForm['content'].touched}
          value={postForm['content'].value}
        />
      </form>
    </Modal>
  </React.Fragment>
};


export default AddPost;