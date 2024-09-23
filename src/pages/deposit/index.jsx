"use client";
import styles from "../../styles/products.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/header";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import { Field, Form, Formik, useField } from "formik";
import AdminInput from "../../../components/inputs/adminInput";
import SingularSelect from "../../../components/selects/SingularSelect";
import members from "../../../data/members";
import months from "../../../data/month";
import paymentMethod from "../../../data/payment_method";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Images from "../../../components/inputs/images";
const amounts = [
  { id: 1, name: 1000 },
  { id: 2, name: 1500 },
  { id: 3, name: 2000 },
  { id: 4, name: 2500 },
  { id: 5, name: 3000 },
  { id: 6, name: 3500 },
  { id: 7, name: 4000 },
  { id: 8, name: 4500 },
  { id: 9, name: 5000 },
  { id: 10, name: 5500 },
  { id: 10, name: 6000 },
  { id: 10, name: 6500 },
  { id: 10, name: 7000 },
  { id: 10, name: 7500 },
  { id: 10, name: 8000 },
  { id: 10, name: 8500 },
  { id: 10, name: 9000 },
  { id: 10, name: 9500 },
  { id: 10, name: 10000 },
];

const paymentMethods = [
  { id: 1, name: "Bkash" },
  { id: 2, name: "Nagad" },
  { id: 3, name: "Rocket" },
  { id: 4, name: "Cash" },
  { id: 5, name: "Bank Transfer" },
  { id: 6, name: "Others" },
];
const initialState = {
  name: "",
  // month: "",
  amount: "",
  payment_method: "",
  transaction_id: "",
  // is_approved: 0,
};

export default function AddDeposit({ country, orgMembers }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  // const [members, setMembers] = useState([]);

  const [images, setImages] = useState([]);

  const [deposit, setDeposit] = useState(initialState);

  const router = useRouter();

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    amount: Yup.string().required("Please add a amount"),
    payment_method: Yup.string().required("Please add a payment method"),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    // sku: Yup.string().required("Please add a sku/number"),
    // color: Yup.string().required("Please add a color"),
    // description: Yup.string().required("Please add a description"),
  });

  // useEffect(() => {
  //   const getParentData = async () => {
  //     // const { data } = await axios.get(`/api/product/${product.parent}`);
  //     // console.log(data);
  //     // if (data) {
  //     setDeposit({
  //       ...deposit,
  //       name: orgMembers?.name,
  //       id: orgMembers?.id,
  //       value: orgMembers?.value,
  //       // description: data.description,
  //       // brand: data.brand,
  //       // category: data.category,
  //       // subCategories: data.subCategories,
  //       // questions: [],
  //       // details: [],
  //     });
  //     // }
  //   };
  //   getParentData();
  // }, []);
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
    setLoading(true);
    try {
      const { data } = await axios.post("/api/deposit", {
        ...deposit,
      });
      console.log(data);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setDeposit({ ...deposit, [name]: value });
  };

  const handleSubmit = async () => {
    console.clear();
    // e.preventDefault();

    // if (!title || !description) {
    //   alert("Title and description are required.");
    //   return;
    // }
    debugger;
    try {
      // const res = await fetch("/api/deposit", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(deposit),
      // });

      const res = await axios.post("/api/deposit", deposit);
      debugger;
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a deposit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session && (
        <>
          <ToastContainer />
          <Header country={country} />
          <div //className={styles.header}
          >
            {/* Create Product */}
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              name: deposit?.name,
              // month: deposit.month,
              amount: deposit.amount,
              payment_method: deposit.payment_method,
              transaction_id: deposit.transaction_id,
              // is_approved: deposit.is_approved,
            }}
            // validationSchema={validate}
            onSubmit={() => {
              createProduct();
              // handleSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <SingularSelect
                  name="name"
                  value={deposit.name}
                  placeholder="Select Member"
                  data={orgMembers}
                  // header="Select Depositor"
                  handleChange={handleChange}
                />

                <SingularSelect
                  name="amount"
                  value={deposit.amount}
                  placeholder="Select Amount"
                  data={amounts}
                  // header="Select Depositor"
                  handleChange={handleChange}
                />

                <SingularSelect
                  name="payment_method"
                  value={deposit.payment_method}
                  placeholder="Select Payment Method"
                  data={paymentMethods}
                  // header="Select Depositor"
                  handleChange={handleChange}
                />

                <AdminInput
                  type="text"
                  label="Transaction Id"
                  name="transaction_id"
                  placholder="Enter Transaction Id"
                  onChange={handleChange}
                />
                <Images
                  name="imageInputFile"
                  header="Document Carousel"
                  text="Add images"
                  images={images}
                  setImages={setImages}
                  // setColorImage={setColorImage}
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
                  className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
                  type="submit"
                >
                  Add Deposit
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
        name: "Bangladesh",
        code: "BD",
        flag: "https://www.seekpng.com/png/full/270-2704243_quality-hd-good-photos-of-bangladesh-flag-bangladesh.png",
      },
      orgMembers: JSON.parse(JSON.stringify(members)),
    },
  };
}
