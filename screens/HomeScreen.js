import { SafeAreaView, Text, Button } from "react-native";
import { clearToken, clearUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { selectToken, selectUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";


export default function() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    const logoutHandler = async () => {
        try {
          await axios.post(
            "https://chaintales.bieda.it/api/v1/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(clearToken());
          dispatch(clearUser());
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <SafeAreaView>
            {user ? <Text>Welcome home, {user.name}</Text> : <Text>Chaintales</Text> }
            <Button title="Logout" onPress={logoutHandler} />
        </SafeAreaView>
    );
}
