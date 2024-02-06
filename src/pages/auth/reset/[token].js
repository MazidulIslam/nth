import React, { useState } from 'react';
import * as Yup from 'yup';
import styles from '../../../styles/Forgot.module.scss';
import Footer from '../../../../components/footer';
import Header from '../../../../components/header';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import LoginInput from '../../../../components/inputs/loginInput';
import { Form, Formik } from 'formik';
import CircledIconBtn from '../../../../components/buttons/circledIconBtn';
import DotLoaderSpinner from '../../../../components/loaders/dotLoaders';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getSession, signIn } from 'next-auth/react';
export default function Reset({ user_id }) {
  const country = {
    name: 'Bangladesh',
    code: 'BD',
    flag: 'https://www.seekpng.com/png/full/270-2704243_quality-hd-good-photos-of-bangladesh-flag-bangladesh.png',
  };
  const [password, setPassword] = useState('');
  const [conf_password, setConf_Password] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required('Please enter your new password.')
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/api/auth/reset', {
        user_id,
        password,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn('credentials', options);
      window.location.reload(true);
      setError('');
      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password ! <Link href="/">Login instead</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_Password(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Submit" />
                <div>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
                <div>
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(contex) {
  const { query, req } = contex;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
