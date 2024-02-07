'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/header';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik/dist';
import AdminInput from '../../../components/inputs/adminInput';
import SingularSelect from '../../../components/selects/SingularSelect';
import tempData from '../../../tempData';

const initialState = {
  name: '',
  description: '',
  brand: '',
  sku: '',
  discount: 0,
};

export default function AddTopic({ country }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [deposit, setDeposit] = useState(initialState);

  const router = useRouter();

  const validate = Yup.object({
    name: Yup.string()
      .required('Please add a name')
      .min(10, 'Product name must bewteen 10 and 300 characters.')
      .max(300, 'Product name must bewteen 10 and 300 characters.'),
    brand: Yup.string().required('Please add a brand'),
    category: Yup.string().required('Please select a category.'),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    sku: Yup.string().required('Please add a sku/number'),
    color: Yup.string().required('Please add a color'),
    description: Yup.string().required('Please add a description'),
  });
  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == 'valid') {
      createProductHandler();
    } else {
      dispatch(
        showDialog({
          header: 'Please follow our instructions.',
          msgs: test,
        })
      );
    }
  };
  const createProductHandler = async () => {
    setLoading(true);
    if (images) {
      let temp = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = 'product images';
      let formData = new FormData();
      formData.append('path', path);
      temp.forEach((image) => {
        formData.append('file', image);
      });
      uploaded_images = await uploadImages(formData);
    }
    if (product.color.image) {
      let temp = dataURItoBlob(product.color.image);
      let path = 'product style images';
      let formData = new FormData();
      formData.append('path', path);
      formData.append('file', temp);
      let cloudinary_style_img = await uploadImages(formData);
      style_img = cloudinary_style_img[0].url;
    }
    try {
      const { data } = await axios.post('/api/admin/product', {
        ...product,
        images: uploaded_images,
        color: {
          image: style_img,
          color: product.color.color,
        },
      });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setDeposit({ ...deposit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }

    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      //   const res = await axios.post('/api/deposit/route', {
      //     title,
      //     description,
      //   });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to create a deposit');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session && (
        <>
          <Header country={country} />
          <div //className={styles.header}
          >
            Create Product
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              name: deposit.name,
              //   brand: product.brand,
              //   description: product.description,
              //   category: product.category,
              //   subCategories: product.subCategories,
              //   parent: product.parent,
              //   sku: product.sku,
              //   discount: product.discount,
              //   color: product.color.color,
              //   imageInputFile: '',
              //   styleInout: '',
            }}
            validationSchema={validate}
            onSubmit={() => {
              createProduct();
            }}
          >
            {(formik) => (
              <Form>
                <Field type="email" name="email" placeholder="Email" />
                <Field as="select" name="color">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>

                {/* <SingularSelect
                  data={tempData.memberName}
                  handleChange={handleChange}
                  placeholder="Name"
                  header="Select Name"
                  disabled={true}
                  name="member"
                  value={tempData.memberName[0]}
                /> */}

                {/* <SingularSelect
                  name="category"
                  value={'productcategory'}
                  placeholder="Category"
                  data={'categories'}
                  header="Select a Category"
                  handleChange={handleChange}
                  disabled={true}
                /> */}

                {/* <AdminInput
                  type="text"
                  label="Name"
                  name="name"
                  placholder="Product name"
                  onChange={handleChange}
                />
                <AdminInput
                  type="text"
                  label="Description"
                  name="description"
                  placholder="Product description"
                  onChange={handleChange}
                />
                <AdminInput
                  type="text"
                  label="Brand"
                  name="brand"
                  placholder="Product brand"
                  onChange={handleChange}
                />
                <AdminInput
                  type="text"
                  label="Sku"
                  name="sku"
                  placholder="Product sku/ number"
                  onChange={handleChange}
                />
                <AdminInput
                  type="text"
                  label="Discount"
                  name="discount"
                  placholder="Product discount"
                  onChange={handleChange}
                /> */}

                {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
                <button
                  //className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
                  type="submit"
                >
                  Create Product
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.COUNTRY_API}`)
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      // country: { name: data.name, code: data.code, flag: data.flag.emojitwo },
      country: {
        name: 'Bangladesh',
        code: 'BD',
        flag: 'https://www.seekpng.com/png/full/270-2704243_quality-hd-good-photos-of-bangladesh-flag-bangladesh.png',
      },
    },
  };
}
