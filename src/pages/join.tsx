import Button from "@/app/componnets/button";
import { Formik } from "formik";
interface MyFormValues {
  username: string;
  room: string;
}

const JoinRoom = () => {
  const initialValues: MyFormValues = { username: "", room: "" };

  return (
    <>
      <div>
        <Formik initialValues={initialValues}>
          <form className="flex flex-col justify-center items-center mt-52 bg-slate-600 max-w-screen-lg mx-auto py-32 rounded-xl">
            <h1 className="text-3xl mb-3 text-slate-950">Developers Room</h1>
            <div className="flex flex-col gap-4 bg-slate-400 py-10 px-10 rounded-xl">
              <div className="flex flex-col ">
                <label htmlFor="username" className="text-xl">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-96 border rounded-lg p-1"
                />
              </div>
              <div className="flex flex-col ">
                <select
                  placeholder="Select Your Room"
                  className="border w-96 p-1 text-xl rounded-lg"
                >
                  <option value="fruit">Rect</option>

                  <option value="vegetable">Node</option>

                  <option value="meat">Javascript</option>
                </select>
              </div>
              <Button text={"Submit"} className={"mt-6 w-full rounded-lg"} />

            </div>
          </form>
        </Formik>
      </div>
    </>
  );
};

export default JoinRoom;
