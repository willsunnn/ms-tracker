import { User } from "firebase/auth";
import UserDataApi from "../persistence/UserDataApi";
import { useEffect } from "react";

const HomePageComponent = (props: {user: User}) => {
    const { user } = props;
    // const alert = useAlertCallback();

    useEffect(() => {
        const data = UserDataApi.get(user).then((data) => {
            console.log(data);
        }).catch((err) => {
            alert(err);
        });

    }, []);


    return (<>
        <h1 className="text-3xl font-bold underline text-red-600">
          {`userId=${(user!=null)? user.uid : 'null'}`}
        </h1>
    
    </>);
}

export default HomePageComponent;