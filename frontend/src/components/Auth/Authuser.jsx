import AuthForm from "./AuthForm"

function Authuser() {

    let getData = (data) => {
      console.log("UserData:",data);
    }
  return (
    <>
        <div>
          <AuthForm onSubmit={getData}></AuthForm>
        </div>
    </>
  )
}

export default Authuser
