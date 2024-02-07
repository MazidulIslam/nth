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
import members from '../../../data/members';
import months from '../../../data/month';
import paymentMethod from '../../../data/payment_method';

const initialState = {
  name: '',
  month: '',
  amount: '',
  payment_method: '',
  transaction_id: '',
  is_approved: 0,
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
    // let test = validateCreateProduct(product, images);
    // if (test == 'valid') {
    createProductHandler();
    // } else {
    //   dispatch(
    //     showDialog({
    //       header: 'Please follow our instructions.',
    //       msgs: test,
    //     })
    //   );
    // }
  };
  const createProductHandler = async () => {
    // setLoading(true);
    debugger;
    // try {

    const { data } = await axios.post('/api/deposit', {
      ...deposit,
    });
    setLoading(false);
    toast.success(data.message);
    // } catch (error) {
    //   setLoading(false);
    //   toast.error(error.response.data.message);
    // }
  };
  const handleChange = (e) => {
    debugger;
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
            {/* Create Product */}
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              name: deposit.name,
              month: deposit.month,
              amount: deposit.amount,
              payment_method: deposit.payment_method,
              transaction_id: deposit.transaction_id,
              is_approved: deposit.is_approved,
            }}
            // validationSchema={validate}
            onSubmit={() => {
              createProduct();
            }}
          >
            {(formik) => (
              <Form>
                <label htmlFor="name" style={{ display: 'block' }}>
                  Name :
                </label>
                <select
                  name="name"
                  value={deposit.name}
                  onChange={handleChange}
                  //   onBlur={handleBlur}
                  style={{ display: 'block', padding: '5px' }}
                >
                  <option value="" label="Select Name"></option>

                  {members.map((member) => (
                    <option
                      key={member.id}
                      value={member.name}
                      label={member.name}
                    >
                      {member.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="month" style={{ display: 'block' }}>
                  Month :
                </label>
                <select
                  name="month"
                  value={deposit.month}
                  onChange={handleChange}
                  //   onBlur={handleBlur}
                  style={{ display: 'block', padding: '5px' }}
                >
                  <option value="" label="Select Month"></option>

                  {months.map((month) => (
                    <option
                      key={month.id}
                      value={month.name}
                      label={month.name}
                    >
                      {month.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="payment_method" style={{ display: 'block' }}>
                  Payment Method :
                </label>
                <select
                  name="payment_method"
                  value={deposit.payment_method}
                  onChange={handleChange}
                  //   onBlur={handleBlur}
                  style={{ display: 'block', padding: '5px' }}
                >
                  <option value="" label="Select Payment Method"></option>

                  {paymentMethod.map((payment) => (
                    <option
                      key={payment.id}
                      value={payment.name}
                      label={payment.name}
                    >
                      {payment.name}
                    </option>
                  ))}
                </select>
                <Field
                  style={{ display: 'block' }}
                  type="text"
                  name="transaction_id"
                  placeholder="Enter Transaction Id"
                />
                {/* <SingularSelect
                  data={tempData.memberName}
                  handleChange={handleChange}
                  placeholder="Name"
                  header="Select Name"
                  disabled={true}
                  name="member"
                  value={tempData.memberName[0]}
                /> */}

                {/* <AdminInput
                  type="text"
                  label="Name"
                  name="name"
                  placholder="Product name"
                  onChange={handleChange}
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
