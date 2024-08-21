import AuthForm from "../Auth/AuthForm";

function Admin() {

  let getData = (data) => {
    console.log("AdminData:",data);
  }

  return (
    <>
      <AuthForm onSubmit={getData}></AuthForm>
    </>
  )
}

export default Admin